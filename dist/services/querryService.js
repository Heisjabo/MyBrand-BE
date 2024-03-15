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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeQuerry = exports.readQuerries = exports.addQuerry = void 0;
const querries_1 = __importDefault(require("../models/querries"));
const addQuerry = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield querries_1.default.create(body);
    return query;
});
exports.addQuerry = addQuerry;
const readQuerries = () => __awaiter(void 0, void 0, void 0, function* () {
    const querries = yield querries_1.default.find();
    return querries;
});
exports.readQuerries = readQuerries;
const removeQuerry = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const querry = yield querries_1.default.findByIdAndDelete(id);
});
exports.removeQuerry = removeQuerry;
