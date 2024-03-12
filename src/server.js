const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db.js");
const mainRouter = require("./routes/index.js")
const PORT = process.env.PORT | 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "welcome to my brand backend"
    })
});

app.use("/api/v1", mainRouter);

app.use("/*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Invalid url"
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
