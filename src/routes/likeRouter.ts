import express from "express"
import { like, getLikes } from "../controllers/likeController"
const router = express.Router()
import { isLoggedIn } from "../middlewares/isLoggedIn";

router.post("/:id/likes", isLoggedIn, like);
router.get("/:id/likes", getLikes);

export default router;