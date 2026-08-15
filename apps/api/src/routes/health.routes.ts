import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "scale-gate-api",
    status: "healthy"
  });
});

export default router;