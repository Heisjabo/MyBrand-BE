import express from "express"
import { like, getLikes, removeLike } from "../controllers/likeController"
const router = express.Router()

router.post("/:id/likes", like);
router.get("/:id/likes", getLikes);
router.post("/:id/likes/:likeId", removeLike);

export default router;