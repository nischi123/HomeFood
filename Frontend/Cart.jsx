import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import "./Cart.css";

function Cart({ addedItems, foods, removeFromCart }) {
  const navigate = useNavigate();

  const cartFoods = addedItems
    .map((name) => foods.find((food) => food.name === name))
    .filter(Boolean);

  const total = cartFoods.reduce((sum, food) => sum + food.price, 0);

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
          <button onClick={() => navigate("/")}>Explore Food</button>
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
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;