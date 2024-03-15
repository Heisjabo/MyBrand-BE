"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const router = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
router.post('/:id/comments', auth_1.authMiddleware, commentController_1.addComment);
router.get('/:id/comments', commentController_1.getComments);
exports.default = router;
