"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogRouter_1 = __importDefault(require("./blogRouter"));
const commentRouter_1 = __importDefault(require("./commentRouter"));
const likeRouter_1 = __importDefault(require("./likeRouter"));
const querriesRouter_1 = __importDefault(require("./querriesRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const mainRouter = express_1.default.Router();
mainRouter.use("/blogs", blogRouter_1.default);
mainRouter.use("/blogs", commentRouter_1.default);
mainRouter.use("/blogs", likeRouter_1.default);
mainRouter.use("/", querriesRouter_1.default);
mainRouter.use("/users", userRouter_1.default);
exports.default = mainRouter;
