export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      res.status(401).json({
        success: false,
        message: "please provide the admin password to admin login!",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
