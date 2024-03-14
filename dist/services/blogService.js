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
exports.deleteBlogById = exports.getSingleBlog = exports.newBlog = exports.getBlog = void 0;
const blog_1 = __importDefault(require("../models/blog"));
const getBlog = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_1.default.find();
    return blogs;
});
exports.getBlog = getBlog;
const newBlog = (blog) => __awaiter(void 0, void 0, void 0, function* () {
    const newblog = yield blog_1.default.create(blog);
    return newblog;
});
exports.newBlog = newBlog;
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_1.default.findById(id);
    return blog;
});
exports.getSingleBlog = getSingleBlog;
const deleteBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield blog_1.default.findByIdAndDelete(id);
    return response;
});
exports.deleteBlogById = deleteBlogById;
