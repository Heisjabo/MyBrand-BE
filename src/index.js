const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const blogRouter = require("./routes/blogRouter.js");
const userRouter = require("./routes/userRouter.js");
const PORT = process.env.PORT | 5000

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("mongoDB Connected!")
}).catch(err => console.log(err));

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "welcome to my brand backend"
    })
})

app.use("/blogs", blogRouter);
app.use("/users", userRouter);

app.use("/*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Invalid url"
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
