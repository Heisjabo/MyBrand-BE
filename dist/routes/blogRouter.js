"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const blogController_js_1 = require("../controllers/blogController.js");
const multer_js_1 = __importDefault(require("../helpers/multer.js"));
router.get("/", blogController_js_1.getBlogs);
router.post("/", multer_js_1.default.single("image"), blogController_js_1.createBlog);
router.get("/:id", blogController_js_1.getBlogById);
router.patch("/:id", multer_js_1.default.single("image"), blogController_js_1.updateBlog);
router.delete("/:id", blogController_js_1.deleteBlog);
exports.default = router;
