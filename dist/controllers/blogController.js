"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.deleteBlog = exports.getBlogById = exports.getBlogs = exports.createBlog = void 0;
const cloud_1 = __importDefault(require("../helpers/cloud"));
const blogService_1 = require("../services/blogService");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    try {
        const result = yield (0, cloud_1.default)(file, res);
        const blog = yield (0, blogService_1.newBlog)({
            title: req.body.title,
            description: req.body.description,
            image: result
        });
        res.status(200).json({
            status: "success",
            message: "Blog was created successfully!",
            data: blog
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        });
    }
});
exports.createBlog = createBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield (0, blogService_1.getBlog)();
        res.status(200).json({
            status: "success",
            data: blogs
        });
    }
    catch (err) {
        res.status(400).json({
            status: "error",
            error: err.message
        });
    }
});
exports.getBlogs = getBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const blog = yield (0, blogService_1.getSingleBlog)(id);
        if (!blog) {
            return res.status(404).json({
                status: "error",
                message: "Blog not found"
            });
        }
        return res.status(200).json({
            status: "success",
            data: blog
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
});
exports.getBlogById = getBlogById;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const blog = yield (0, blogService_1.deleteBlogById)(id);
        if (!blog) {
            return res.status(404).json({
                status: "failed",
                message: "Blog not found"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Blog deleted successfully"
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "failed",
            error
        });
    }
});
exports.deleteBlog = deleteBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield (0, blogService_1.getSingleBlog)(req.params.id);
        if (!blog) {
            res.status(404).json({
                status: "error",
                message: "Blog not found"
            });
            return;
        }
        if (req.body.title) {
            blog.title = req.body.title;
        }
        if (req.body.description) {
            blog.description = req.body.description;
        }
        if (req.file) {
            const result = yield (0, cloud_1.default)(req.file, res);
            blog.image = result;
        }
        yield blog.save();
        res.status(200).json({
            status: "success",
            message: "Blog was updated successfully!",
            blog
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
});
exports.updateBlog = updateBlog;
