"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryController_1 = require("../controllers/queryController");
const router = express_1.default.Router();
const authorization_1 = require("../middlewares/authorization");
router.post("/querries", queryController_1.createQuery);
router.get("/querries", authorization_1.Authorization, queryController_1.getQuerries);
router.delete("/querries/:id", authorization_1.Authorization, queryController_1.deleteQuerry);
exports.default = router;
