import express from "express";
const router = express.Router();
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";
import upload from "../helpers/multer.js";

router.get("/", getBlogs);
router.post("/", upload.single("image"), createBlog);
router.get("/:id", getBlogById);
router.patch("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
