import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(401).json({
        success: false,
        message: "please provide the admin password for admin login!",
      });
    }

    if (password !== process.env.ADMIN_PASS) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ password }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // FIX: cookie + response together
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, token });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true , message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const password = req.password;

    if (password !== process.env.ADMIN_PASS) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    return res.json({ success: true, message: "auth successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
