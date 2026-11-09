const {
    createRazorPayOrder,
    verifyRazorPayPayment,
} = require("../Services/razorpayservice");

const generateReceipt = require("../utils/generateReceipt");

// Create Razorpay order
const createOrder = async (req, res) => {
    try {
        const { amount, idempotencyKey } = req.body;

        if (!amount || !idempotencyKey) {
            return res.status(400).json({
                success: false,
                message: "Amount and idempotency key are required",
            });
        }

        const receipt = await generateReceipt();

        const order = await createRazorPayOrder(
            amount,
            receipt,
            idempotencyKey
        );

        return res.status(200).json({
            success: true,
            message: "Razorpay order created successfully",
            data: order,
        });

    } catch (error) {
        console.error("Create order error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Verify Razorpay payment
const verifyPayment = async (req, res) => {
    try {
        const payment = await verifyRazorPayPayment(req.body);

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            data: payment,
        });

    } catch (error) {
        console.error("Verify payment error:", error);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};