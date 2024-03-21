"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./routes/index"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to my brand backend"
    });
});
app.use("/api/v1", index_1.default);
app.use("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Invalid URL"
    });
});
exports.default = app;
