import express from "express";
const router = express.Router();

// Verify Pi login payload (dummy for now)
router.post("/verify", (req, res) => {
  const { user } = req.body;
  if (user) {
    return res.json({ success: true, user });
  }
  res.status(400).json({ success: false, message: "Invalid user" });
});

export default router;
