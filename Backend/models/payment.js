
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        receipt: {
            type: String,
            required: true,
            unique: true,
        },

        razorpayOrderId: {
            type: String,
            unique: true,
            sparse: true,
        },

        razorpayPaymentId: {
            type: String,
            default: null,
        },

        amount: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            default: "INR",
        },

        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED"],
            default: "PENDING",
        },

        idempotencyKey: {
            type: String,
            required: true,
            unique: true,
        },

        failureReason: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payment", paymentSchema);
