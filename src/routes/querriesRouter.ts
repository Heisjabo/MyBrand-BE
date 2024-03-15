import express from "express";
import { createQuery, getQuerries, deleteQuerry } from "../controllers/queryController";
const router = express.Router();

router.post("/querries", createQuery);
router.get("/querries", getQuerries);
router.delete("/querries/:id", deleteQuerry);

export default router;