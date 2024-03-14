import express from "express";
import blogRouter from "./blogRouter";
const mainRouter = express.Router();
// const userRouter = require("./userRouter")

mainRouter.use("/blogs", blogRouter);
// mainRouter.use("/users", userRouter)

export default mainRouter;