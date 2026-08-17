import { Router } from "express";
import { env } from "../config/env.js";
const router = Router();
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        service: env.SERVICE_NAME,
        server: env.SERVER_ID,
        status: "healthy"
    });
});
export default router;
