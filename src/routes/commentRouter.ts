import express from "express";
import { addComment, getComments } from "../controllers/commentController";
const router = express.Router();
import { isLoggedIn } from "../middlewares/isLoggedIn";

router.post('/:id/comments', isLoggedIn, addComment)
router.get('/:id/comments', getComments)

export default router;