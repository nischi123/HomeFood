
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import "./Cart.css";

function Cart({ addedItems, foods, removeFromCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const cartFoods = addedItems
    .map((name) => foods.find((food) => food.name === name))
    .filter(Boolean);

  const total = cartFoods.reduce(
    (sum, food) => sum + food.price,
    0
  );

  // Handle Razorpay payment
  const handlePayment = async () => {
    try {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error("Razorpay Key ID is missing. Check your frontend .env file.");
      }
      if (total <= 0) {
        alert("Your cart is empty.");
        return;
      }

      setLoading(true);

      // Generate a unique idempotency key for this payment attempt
      const idempotencyKey = crypto.randomUUID();

      // Step 1: Create Razorpay order
      const response = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            idempotencyKey,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Order creation failed");
      }

      const order = result.data;

      // Step 2: Configure Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(total * 100),
        currency: "INR",
        name: "HomeFood",
        description: "Food Order Payment",
        order_id: order.id,

        // Step 3: Verify payment on the backend
        handler: async function (paymentResponse) {
          try {
            const verifyResponse = await fetch(
              "http://localhost:5000/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentResponse),
              }
            );

            const verifyResult = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyResult.success) {
              throw new Error(
                verifyResult.message || "Payment verification failed"
              );
            }

            alert("Payment successful!");

          } catch (error) {
            console.error("Payment verification error:", error);
            alert(error.message);
          } finally {
            setLoading(false);
          }
        },

        // Handle Checkout closing
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#3399cc",
        },
      };

      // Step 4: Open Razorpay Checkout
      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout script is not loaded.");
      }

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(response.error.description || "Payment failed.");
        setLoading(false);
      });

      razorpay.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <h1>
          <ShoppingCart size={25} />
          Your Cart ({cartFoods.length})
        </h1>
      </header>

      {cartFoods.length === 0 ? (
        <div className="empty-cart">
          <ShoppingCart size={55} />
          <h2>Your cart is empty</h2>
          <p>Add your favourite homemade food to get started.</p>
          <button onClick={() => navigate("/")}>
            Explore Food
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cartFoods.map((food) => (
              <div className="cart-item" key={food.name}>
                <img src={food.image} alt={food.name} />

                <div className="cart-item-details">
                  <h3>{food.name}</h3>
                  <p>₹{food.price}</p>
                </div>

                <button
                  className="cart-remove-btn"
                  onClick={() => removeFromCart(food.name)}
                  disabled={loading}
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total Amount</span>
            <h2>₹{total}</h2>

            <button
              className="continue-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

            <button
              className="continue-btn"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${total}`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
