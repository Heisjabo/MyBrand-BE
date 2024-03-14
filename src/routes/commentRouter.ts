import express from "express";
import { addComment, getComments } from "../controllers/commentController";
const router = express.Router();

router.post('/:id/comments', addComment)
router.get('/:id/comments', getComments)

export default router;