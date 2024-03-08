const express = require("express");
const router = express.Router();
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController.js");
const upload = require("../helpers/multer.js");

router.get("/", getBlogs);
router.post("/", upload.single("image"), createBlog);
router.get("/:id", getBlogById);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
