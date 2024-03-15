"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = exports.userSchema = exports.querySchema = exports.blogSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.blogSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required()
});
exports.querySchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(30).required(),
    email: joi_1.default.string().email().required(),
    message: joi_1.default.string().max(1000).required(),
});
exports.userSchema = joi_1.default.object({
    name: joi_1.default.string().min(4).max(12).required(),
    email: joi_1.default.string().email().trim().required(),
    role: joi_1.default.string().trim(),
    password: joi_1.default.string().trim().required()
});
exports.authSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
