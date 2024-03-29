import express from "express";
const router = express.Router();
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blogController";
import upload from "../helpers/multer";
import { isAdmin } from "../middlewares/isAdmin";
import { isLoggedIn } from "../middlewares/isLoggedIn";

router.get("/", getBlogs);
router.post("/", isLoggedIn, isAdmin, upload.single("image"), createBlog);
router.get("/:id", getBlogById);
router.patch("/:id", isLoggedIn, isAdmin, upload.single("image"), updateBlog);
router.delete("/:id", isLoggedIn, isAdmin, deleteBlog);

export default router;
