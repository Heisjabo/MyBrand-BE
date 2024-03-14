"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuerry = exports.getQuerries = exports.createQuerry = void 0;
const querryService_1 = require("../services/querryService");
const createQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield (0, querryService_1.addQuerry)({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        res.status(201).json({
            status: "success",
            message: "your message was sent!",
            data: query
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message
        });
    }
});
exports.createQuerry = createQuerry;
const getQuerries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querries = yield (0, querryService_1.readQuerries)();
        res.status(200).json({
            status: "success",
            data: querries
        });
    }
    catch (err) {
        res.status(500).json({
            status: "Error",
            error: err.message
        });
    }
});
exports.getQuerries = getQuerries;
const deleteQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querry = yield (0, querryService_1.removeQuerry)(req.params.id);
        res.status(204).json({
            status: "success",
            message: "querry deleted successfully!"
        });
    }
    catch (err) {
        res.status(500).json({
            status: "Error",
            error: err.message
        });
    }
});
exports.deleteQuerry = deleteQuerry;
