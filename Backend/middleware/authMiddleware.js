const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get JWT from HTTP-only cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Please login first.",
      });
    }

    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded user information in request
    req.user = decoded;

    // Continue to the route
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;