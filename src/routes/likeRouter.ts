import express from "express"
import { like, getLikes } from "../controllers/likeController"
const router = express.Router()
import { authMiddleware } from "../middlewares/auth";

router.post("/:id/likes", authMiddleware, like);
router.get("/:id/likes", getLikes);

export default router;