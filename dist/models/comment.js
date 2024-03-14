"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    blog: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Blog'
    }
});
const Comment = (0, mongoose_1.model)('Comment', commentSchema);
exports.default = Comment;
