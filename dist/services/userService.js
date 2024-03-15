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
exports.editUser = exports.removeUser = exports.checkUser = exports.getSingleUser = exports.getUsers = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_1.default.create(user);
    return newUser;
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    return users;
});
exports.getUsers = getUsers;
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
exports.getSingleUser = getSingleUser;
const checkUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: email });
    return user;
});
exports.checkUser = checkUser;
const removeUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByIdAndDelete(id);
    if (!user) {
        throw new Error("User Not Found");
    }
    return;
});
exports.removeUser = removeUser;
const editUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_1.default.findByIdAndUpdate(id, user);
    return newUser;
});
exports.editUser = editUser;
