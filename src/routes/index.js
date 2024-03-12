const express = require("express");
const mainRouter = express.Router();
const blogRouter = require("./blogRouter");
// const userRouter = require("./userRouter")

mainRouter.use("/blogs", blogRouter);
// mainRouter.use("/users", userRouter)

module.exports = mainRouter;