
const Razorpay = require("razorpay");
const Payment = require("../models/payment");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const createRazorPayOrder = async (amountInrupees, receipt, idempotencyKey) => {
    try {
        const amount = Number(amountInrupees);

        if (
            !Number.isFinite(amount) ||
            amount <= 0 ||
            !Number.isSafeInteger(Math.round(amount * 100))
        ) {
            throw new Error("Invalid payment amount");
        }

        if (!receipt || !idempotencyKey) {
            throw new Error("Receipt and idempotency key are required");
        }

        // Check for an existing payment
        let payment = await Payment.findOne({ idempotencyKey });

        if (payment) {
            // Ensure the same key is not reused for a different amount
            if (payment.amount !== amount) {
                throw new Error(
                    "Idempotency key already used with a different amount"
                );
            }

            // Return the existing Razorpay order if available
            if (payment.razorpayOrderId) {
                return {
                    id: payment.razorpayOrderId,
                    amount: payment.amount,
                    currency: payment.currency,
                    receipt: payment.receipt,
                    status: payment.status,
                };
            }

            // Reuse the existing payment record and receipt
            receipt = payment.receipt;

        } else {
            // Create a new payment record
            try {
                payment = await Payment.create({
                    receipt,
                    idempotencyKey,
                    amount,
                    currency: "INR",
                    status: "PENDING",
                });

            } catch (error) {
                if (error.code === 11000) {
                    payment = await Payment.findOne({ idempotencyKey });

                    if (!payment) {
                        throw error;
                    }

                    if (payment.amount !== amount) {
                        throw new Error(
                            "Idempotency key already used with a different amount"
                        );
                    }

                    if (payment.razorpayOrderId) {
                        return {
                            id: payment.razorpayOrderId,
                            amount: payment.amount,
                            currency: payment.currency,
                            receipt: payment.receipt,
                            status: payment.status,
                        };
                    }

                    receipt = payment.receipt;
                } else {
                    throw error;
                }
            }
        }

        // Convert rupees to paise for Razorpay
        const amountInPaise = Math.round(amount * 100);

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt,
        });

        // Save Razorpay order ID in the existing record
        payment.razorpayOrderId = order.id;
        await payment.save();

        return {
            id: order.id,
            amount: payment.amount,
            currency: payment.currency,
            receipt: payment.receipt,
            status: payment.status,
        };

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        throw error;
    }
};

const handleFailedPayment = async ({
    razorpay_order_id,
    razorpay_payment_id,
    error_description,
}) => {
    try {
        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!payment) {
            throw new Error("Payment record not found");
        }

        // Don't overwrite a successful payment
        if (payment.status === "SUCCESS") {
            return payment;
        }

        payment.razorpayPaymentId = razorpay_payment_id;
        payment.status = "FAILED";
        payment.failureReason = error_description || "Payment failed";

        await payment.save();

        return payment;

    } catch (error) {
        console.error("Payment failure handling error:", error);
        throw error;
    }
};
const verifyRazorPayPayment = async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
}) => {
    try {
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        const receivedSignature = Buffer.from(
            razorpay_signature || "",
            "utf8"
        );

        const expectedSignature = Buffer.from(
            generatedSignature,
            "utf8"
        );

        if (
            receivedSignature.length !== expectedSignature.length ||
            !crypto.timingSafeEqual(expectedSignature, receivedSignature)
        ) {
            throw new Error("Invalid payment signature");
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!payment) {
            throw new Error("Payment record not found");
        }

        if (payment.status === "SUCCESS") {
            return payment;
        }

        const razorpayPayment = await razorpay.payments.fetch(
            razorpay_payment_id
        );

        if (
            razorpayPayment.order_id !== razorpay_order_id ||
            razorpayPayment.status !== "captured"
        ) {
            throw new Error("Payment is not captured");
        }

        payment.razorpayPaymentId = razorpay_payment_id;
        payment.status = "SUCCESS";

        await payment.save();

        return payment;

    } catch (error) {
        console.error("Payment verification error:", error);
        throw error;
    }
};

module.exports = {
    razorpay,
    createRazorPayOrder,
    handleFailedPayment,
    verifyRazorPayPayment,
};

