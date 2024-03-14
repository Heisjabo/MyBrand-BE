import express from "express";
import blogRouter from "./blogRouter";
import commentRouter from "./commentRouter";
import likeRouter from "./likeRouter";
const mainRouter = express.Router();
// const userRouter = require("./userRouter")

mainRouter.use("/blogs", blogRouter);
mainRouter.use("/blogs", commentRouter);
mainRouter.use("/blogs", likeRouter);
// mainRouter.use("/users", userRouter)

export default mainRouter;