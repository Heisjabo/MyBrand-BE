import express from "express";
const router = express.Router();
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";
import upload from "../helpers/multer.js";
import { Authorization } from "../middlewares/authorization.js";

router.get("/", getBlogs);
router.post("/", Authorization, upload.single("image"), createBlog);
router.get("/:id", getBlogById);
router.patch("/:id", Authorization, upload.single("image"), updateBlog);
router.delete("/:id", Authorization, deleteBlog);

export default router;
