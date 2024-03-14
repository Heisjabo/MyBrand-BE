import express from "express";
import blogRouter from "./blogRouter";
const mainRouter = express.Router();
import commentRouter from "./commentRouter"
// const userRouter = require("./userRouter")

mainRouter.use("/blogs", blogRouter);
mainRouter.use("/blogs", commentRouter);
// mainRouter.use("/users", userRouter)

export default mainRouter;