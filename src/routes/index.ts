import express from "express";
import blogRouter from "./blogRouter";
import commentRouter from "./commentRouter";
import likeRouter from "./likeRouter";
import querriesRouter from "./queriesRouter";
import userRouter from "./userRouter";
const mainRouter = express.Router();


mainRouter.use("/blogs", blogRouter);
mainRouter.use("/blogs", commentRouter);
mainRouter.use("/blogs", likeRouter);
mainRouter.use("/", querriesRouter);
mainRouter.use("/users", userRouter);

export default mainRouter;