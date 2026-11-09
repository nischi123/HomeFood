require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Home Food backend is running!");
});

app.post("/register", (req, res) => {
  res.send("Home Food registered successfully!");
});
// Connect to MongoDB Atlas and then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");

    const PORT = 5000;

    app.listen(PORT, () => {
      console.log("Backend server successfully running", PORT);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });