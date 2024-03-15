import express from "express";
import { addComment, getComments } from "../controllers/commentController";
const router = express.Router();
import { authMiddleware } from "../middlewares/auth";

router.post('/:id/comments', authMiddleware, addComment)
router.get('/:id/comments', getComments)

export default router;