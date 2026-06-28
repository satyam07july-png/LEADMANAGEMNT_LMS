import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get Token
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided",
      });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;