import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
  const { fullname, username, email, password } = req.body ?? {};

  if (!fullname || !username || !email || !password) {
    return res.status(400).json({
      message: "fullname, username, email, password are required",
    });
  }

  return res.status(201).json({ message: "ok" });
});

export default router;
