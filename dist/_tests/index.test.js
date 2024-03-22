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
const mongoose_1 = __importDefault(require("mongoose"));
const globals_1 = require("@jest/globals");
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI_TEST);
}));
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
let token;
const id = "65f2ce85a186e2957a79fa9b";
(0, globals_1.test)("Test index route", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default).get("/");
    (0, globals_1.expect)(response.status).toBe(200);
}));
(0, globals_1.describe)("GET /", () => {
    (0, globals_1.it)('responds with status 200 successs!', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users");
        (0, globals_1.expect)(response.body.status).toBe("success");
    }));
});
(0, globals_1.describe)("POST /", () => {
    (0, globals_1.it)('responds with status 201 user created!', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users").send({
            name: "Arthur",
            email: "arthur@gmail.com",
            password: "Test@123",
            role: "user"
        });
        (0, globals_1.expect)(response.body.status).toBe("success");
    }));
});
(0, globals_1.describe)("user login", () => {
    (0, globals_1.it)("should login user in", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/auth")
            .send({ email: "jabo@gmail.com", password: 'Test@123' });
        token = response.body.token;
        console.log("Token:", token);
        (0, globals_1.expect)(response.body.status).toBe("success");
    }));
    (0, globals_1.it)("user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/auth")
            .send({ email: "dummy@gmail.com", password: '12345' });
        (0, globals_1.expect)(response.body.status).toBe("Error");
    }));
});
// it("Get single blogs", async () => {
//   const response = await supertest(app).get(`/api/v1/blogs/${id}`);
//   expect(response.status).toBe(200);
// });
(0, globals_1.describe)("Test Blog controllers", () => {
    (0, globals_1.it)("should return all blogs", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/v1/blogs");
        (0, globals_1.expect)(response.status).toBe(200);
    }));
    (0, globals_1.test)("Without title field", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/v1/blogs')
            .send({
            description: "this is a description",
            image: ""
        }).set('Authorization', 'Bearer ' + token);
        (0, globals_1.expect)(res.status).toBe(400);
    }));
    (0, globals_1.it)("should return unauthorized 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/v1/blogs')
            .send({
            title: "Test Blog",
            description: "this is a description",
            image: ""
        });
        (0, globals_1.expect)(res.status).toBe(401);
    }));
    (0, globals_1.it)("should create a new blog", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/blogs")
            .send({
            title: "Test Blog",
            description: "this is a blog description",
            image: ""
        }).set('Authorization', 'Bearer ' + token);
        (0, globals_1.expect)(response.status).toBe(201);
    }));
});
