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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.addComment = void 0;
const blogService_1 = require("../services/blogService");
const commentService_1 = require("../services/commentService");
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.user;
    try {
        const blogId = req.params.id;
        const { content } = req.body;
        const blog = yield (0, blogService_1.getSingleBlog)(blogId);
        if (!blog) {
            return res.status(404).send({ error: "Blog Not Found" });
        }
        const newComment = yield (0, commentService_1.createComment)(user.name, user.email, content, blog._id);
        res.status(201).json({
            status: "success",
            message: "your comment was added successfully!",
            data: newComment
        });
    }
    catch (error) {
        res.status(400).json({ status: "Error", message: error.message });
    }
});
exports.addComment = addComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const comments = yield (0, commentService_1.readComments)(blogId);
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
