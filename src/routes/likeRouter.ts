import express from "express"
import { like, getLikes } from "../controllers/likeController"
const router = express.Router()

router.post("/:id/likes", like);
router.get("/:id/likes", getLikes);

export default router;