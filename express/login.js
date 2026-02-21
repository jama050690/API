import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body ?? {};

  if (!username || !password) {
    return res.status(400).json({
      message: "username and password are required",
    });
  }

  return res.status(201).json({ message: "ok" });
});

export default router;
