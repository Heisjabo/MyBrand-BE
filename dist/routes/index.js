"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogRouter_1 = __importDefault(require("./blogRouter"));
const commentRouter_1 = __importDefault(require("./commentRouter"));
const likeRouter_1 = __importDefault(require("./likeRouter"));
const mainRouter = express_1.default.Router();
// const userRouter = require("./userRouter")
mainRouter.use("/blogs", blogRouter_1.default);
mainRouter.use("/blogs", commentRouter_1.default);
mainRouter.use("/blogs", likeRouter_1.default);
// mainRouter.use("/users", userRouter)
exports.default = mainRouter;
