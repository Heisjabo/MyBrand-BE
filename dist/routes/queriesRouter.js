"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryController_1 = require("../controllers/queryController");
const router = express_1.default.Router();
const isAdmin_1 = require("../middlewares/isAdmin");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
router.post("/queries", queryController_1.createQuery);
router.get("/queries", isLoggedIn_1.isLoggedIn, isAdmin_1.isAdmin, queryController_1.getQuerries);
router.delete("/queries/:id", isLoggedIn_1.isLoggedIn, isAdmin_1.isAdmin, queryController_1.deleteQuerry);
exports.default = router;
