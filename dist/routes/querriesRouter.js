"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const querryController_1 = require("../controllers/querryController");
const router = express_1.default.Router();
router.post("/querries", querryController_1.createQuerry);
router.get("/querries", querryController_1.getQuerries);
router.delete("/querries/:id", querryController_1.deleteQuerry);
exports.default = router;
