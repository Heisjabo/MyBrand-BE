import supertest from "supertest";
import app from "../app";
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import User from "../models/user";


beforeAll(async () => {
    await mongoose.connect("mongodb+srv://jabo:rG7jMHY3wOjbpM6p@cluster0.hxzxy7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  });

afterAll(async () => {
    await mongoose.connection.close();
})

let token: string;
const id = "65f2ce85a186e2957a79fa9b"

test("Test index route", async () => {
  const response = await supertest(app).get("/");
  expect(response.status).toBe(200);
});


describe("GET /", () => {
    it('responds with status 200 successs!', async () => {
      const response = await supertest(app).get("/api/v1/users");
      expect(response.body.status).toBe("success");
    });
});

describe("POST /users", () => {
    it('responds with status 201 user created!', async () => {
      const response = await supertest(app).post("/api/v1/users").send({
        name: "Jabo",
        email: "jabo@gmail.com",
        password: "Test@123",
        role: "admin"
      });
      expect(response.body.status).toBe("success");
    })

    it("should login user in", async () => {
      const response = await supertest(app).post("/api/v1/users/auth")
        .send({ email: "jabo@gmail.com", password: 'Test@123' });
        token = response.body.token;
        console.log("Token:", token);
      expect(response.body.status).toBe("success");
    });

    it("user not found", async () => {
      const response = await supertest(app).post("/api/v1/users/auth")
        .send({ email: "dummy@gmail.com", password: '12345' });
      expect(response.body.status).toBe("Error");
    });

});

describe("Test Blog controllers", () => {

    it("should return all blogs", async () => {
        const response = await supertest(app).get("/api/v1/blogs");
        expect(response.status).toBe(200);
    })

    test("Without title field", async () => {
      const res = await supertest(app)
        .post('/api/v1/blogs')
        .send({
          description: "this is a description",
          image: ""
        }).set('Authorization', 'Bearer ' + token)
      expect(res.status).toBe(400);
    });

    it("should return unauthorized 401", async () => {
      const res = await supertest(app)
        .post('/api/v1/blogs')
        .send({
          title: "Test Blog",
          description: "this is a description",
          image: ""
        })
        expect(res.status).toBe(401)
    })

})



