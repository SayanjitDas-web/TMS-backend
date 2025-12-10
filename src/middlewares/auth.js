import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const auth = (req, res, next) => {
  let token;

  // 1. Check Authorization header (Bearer token)
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. Check HTTP-only cookie
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // No token at all
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.password = decoded.password; // ✔ FIXED

    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
