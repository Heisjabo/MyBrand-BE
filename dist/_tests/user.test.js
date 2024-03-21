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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const globals_1 = require("@jest/globals");
const db_1 = __importDefault(require("../config/db"));
let token;
(0, globals_1.describe)("connect to the database", () => {
    (0, globals_1.it)("should connect the database", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.default)();
    }));
});
(0, globals_1.describe)("GET /", () => {
    (0, globals_1.it)('responds with status 200 successs!', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users");
        (0, globals_1.expect)(response.status).toBe(200);
    }));
});
(0, globals_1.describe)("POST /", () => {
    (0, globals_1.it)('responds with status 201 user created!', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users").send({
            name: "Test",
            email: "newmail5@gmail.com",
            password: "Test@123"
        });
        (0, globals_1.expect)(response.status).toBe(201);
    }));
});
(0, globals_1.describe)("user login", () => {
    (0, globals_1.it)("should login user in", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/auth")
            .send({ email: "jabo@gmail.com", password: 'Test@123' });
        token = response.body.token;
        (0, globals_1.expect)(response.status).toBe(200);
    }));
    (0, globals_1.it)("user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/auth")
            .send({ email: "dummy@gmail.com", password: '12345' });
        (0, globals_1.expect)(response.status).toBe(404);
    }));
    (0, globals_1.it)("user not found without email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/auth")
            .send({ email: "", password: 'Test@123' });
        (0, globals_1.expect)(response.status).toBe(400);
    }));
});
