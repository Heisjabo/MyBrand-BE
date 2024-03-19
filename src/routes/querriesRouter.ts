import express from "express";
import { createQuery, getQuerries, deleteQuerry } from "../controllers/queryController";
const router = express.Router();
import { isAdmin } from "../middlewares/isAdmin";

router.post("/querries", createQuery);
router.get("/querries", isAdmin, getQuerries);
router.delete("/querries/:id", isAdmin, deleteQuerry);

export default router;