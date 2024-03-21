"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const blogController_1 = require("../controllers/blogController");
const multer_1 = __importDefault(require("../helpers/multer"));
const isAdmin_1 = require("../middlewares/isAdmin");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
router.get("/", blogController_1.getBlogs);
router.post("/", isLoggedIn_1.isLoggedIn, isAdmin_1.isAdmin, multer_1.default.single("image"), blogController_1.createBlog);
router.get("/:id", blogController_1.getBlogById);
router.patch("/:id", isLoggedIn_1.isLoggedIn, isAdmin_1.isAdmin, multer_1.default.single("image"), blogController_1.updateBlog);
router.delete("/:id", isLoggedIn_1.isLoggedIn, isAdmin_1.isAdmin, blogController_1.deleteBlog);
exports.default = router;
