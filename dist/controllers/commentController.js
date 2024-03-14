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
exports.getComments = exports.addComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const blog_1 = __importDefault(require("../models/blog"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const { name, email, content } = req.body;
        const blog = yield blog_1.default.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "Blog Not Found" });
        }
        const newComment = yield comment_1.default.create({
            name: name,
            email: email,
            content: content,
            blog: blog._id,
        });
        res.status(201).json({
            status: "success",
            message: "your comment was added successfully!",
            data: newComment
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.addComment = addComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const comments = yield comment_1.default.find({ blog: blogId });
        if (comments) {
            return res.status(200).json({
                status: "success",
                comments: comments.length,
                data: comments
            });
        }
        else {
            res.status(404).json({ error: 'No comment found' });
        }
    }
    catch (error) {
        res.status(500).send({ error: "Server error" });
    }
});
exports.getComments = getComments;
