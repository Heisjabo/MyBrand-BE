import express from "express";
import { createQuery, getQuerries, deleteQuerry } from "../controllers/queryController";
const router = express.Router();
import { isAdmin } from "../middlewares/isAdmin";
import { isLoggedIn } from "../middlewares/isLoggedIn";

router.post("/queries", createQuery);
router.get("/queries", isLoggedIn, isAdmin, getQuerries);
router.delete("/queries/:id", isLoggedIn, isAdmin, deleteQuerry);

export default router;