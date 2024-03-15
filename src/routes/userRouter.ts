import express from "express";
import { registerUser, getAllUsers, getUserById, deleteUser, updateUser, authUser } from "../controllers/userController";
const router = express.Router();

router.post("/", registerUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/auth", authUser);

export default router;