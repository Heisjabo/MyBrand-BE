import express from "express";
import { createQuery, getQuerries, deleteQuerry } from "../controllers/queryController";
const router = express.Router();
import { Authorization } from "../middlewares/authorization";

router.post("/querries", createQuery);
router.get("/querries", Authorization, getQuerries);
router.delete("/querries/:id", Authorization, deleteQuerry);

export default router;