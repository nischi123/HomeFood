import { useState } from "react";

function Payment() {
    const [amount] = useState(0);
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);

            // Create a unique key for this payment attempt
            const idempotencyKey = crypto.randomUUID();

            // Step 1: Create Razorpay order through backend
            const response = await fetch(
                "http://localhost:5000/api/payment/create-order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount,
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
                amount: Math.round(amount * 100),
                currency: "INR",
                name: "HomeFood",
                description: "Food Order Payment",
                order_id: order.id,

                // Step 3: Handle successful Checkout response
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
                        alert(error.message);
                    }
                },

                theme: {
                    color: "#3399cc",
                },
            };

            // Step 4: Open Razorpay Checkout
            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {
            console.error("Payment error:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>HomeFood Payment</h2>

            <p>Amount: ₹{amount}</p>

            <button onClick={handlePayment} disabled={loading}>
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
}

export default Payment;