"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = require("../controllers/likeController");
const router = express_1.default.Router();
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
router.post("/:id/likes", isLoggedIn_1.isLoggedIn, likeController_1.like);
router.get("/:id/likes", likeController_1.getLikes);
exports.default = router;
