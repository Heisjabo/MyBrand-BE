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
exports.authUser = exports.updateUser = exports.deleteUser = exports.getUserById = exports.getAllUsers = exports.registerUser = void 0;
const userService_1 = require("../services/userService");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const validations_1 = require("../utils/validations");
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validations_1.userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: "Error",
                message: error.details[0].message
            });
        }
        const user = yield (0, userService_1.checkUser)(value.email);
        if (user) {
            return res.status(400).json({
                status: "Error",
                message: "User with this email already exists"
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(value.password, salt);
        const newUser = yield (0, userService_1.createUser)({
            name: value.name,
            email: value.email,
            password: hashedPassword,
            role: value.role
        });
        res.status(201).json({
            status: "success",
            message: "User was created successfully!",
        });
    }
    catch (err) {
        res.status(400).json({
            status: "Error",
            message: err.message
        });
    }
});
exports.registerUser = registerUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUsers)();
        res.status(200).json({
            status: "success",
            data: users
        });
    }
    catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.getSingleUser)(req.params.id);
        res.status(200).json({
            status: "success",
            data: user
        });
    }
    catch (err) {
        res.status(400).json({
            status: "Error",
            message: err.message
        });
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.removeUser)(req.params.id);
        return res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });
    }
    catch (err) {
        res.status(400).json({
            status: "Error",
            message: err.message
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validations_1.updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'Error',
                message: error.details[0].message,
            });
        }
        if (!value.name && !value.password && !value.role) {
            return res.status(400).json({
                status: "Error",
                message: "Please add any field to update"
            });
        }
        const user = yield (0, userService_1.editUser)(req.params.id, value);
        res.status(201).json({
            status: "success",
            message: "user updated successfully!",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "Error",
            message: err.message
        });
    }
});
exports.updateUser = updateUser;
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validations_1.authSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: "Error",
                message: error.details[0].message
            });
        }
        const user = yield (0, userService_1.checkUser)(value.email);
        if (!user) {
            res.status(404).json({
                status: "Error",
                message: "user not found"
            });
        }
        const secret = process.env.JWT_SECRET;
        if (user && (yield bcryptjs_1.default.compare(req.body.password, user.password))) {
            res.status(200).json({
                status: "success",
                message: "you are logged in",
                token: jsonwebtoken_1.default.sign({ userId: user._id }, secret, { expiresIn: "1d" }),
            });
        }
        else {
            res.status(401).json({
                status: "Error",
                message: "Incorrect password"
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: "Error",
            message: err.message
        });
    }
});
exports.authUser = authUser;
