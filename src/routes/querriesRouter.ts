import express from "express";
import { createQuerry, getQuerries, deleteQuerry } from "../controllers/querryController";
const router = express.Router();

router.post("/querries", createQuerry);
router.get("/querries", getQuerries);
router.delete("/querries/:id", deleteQuerry);

export default router;