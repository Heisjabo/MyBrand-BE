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
exports.readComments = exports.createComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const createComment = (name, email, content, blog) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_1.default.create({
        name: name,
        email: email,
        content: content,
        blog: blog
    });
    return comment;
});
exports.createComment = createComment;
const readComments = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comment_1.default.find({ blog: blogId });
    return comments;
});
exports.readComments = readComments;
