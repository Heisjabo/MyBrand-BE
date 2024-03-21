import supertest from "supertest";
import app from "../app";
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import connectDB from "../config/db";


let token: string;

describe("connect to the database", () => {
  it("should connect the database", async () => {
    await connectDB();
  })
})


describe("GET /", () => {
    it('responds with status 200 successs!', async () => {
      const response = await supertest(app).get("/api/v1/users");
      expect(response.status).toBe(200);
    });
});

describe("POST /", () => {
    it('responds with status 201 user created!', async () => {
      const response = await supertest(app).post("/api/v1/users").send({
        name: "Test",
        email: "newmail5@gmail.com",
        password: "Test@123"
      });
      expect(response.status).toBe(201);
    })

});

describe("user login", () => {
  it("should login user in", async () => {
    const response = await supertest(app).post("/api/v1/users/auth")
      .send({ email: "jabo@gmail.com", password: 'Test@123' });
    token = response.body.token;
    expect(response.status).toBe(200);
  });

  it("user not found", async () => {
    const response = await supertest(app).post("/api/v1/users/auth")
      .send({ email: "dummy@gmail.com", password: '12345' });
    expect(response.status).toBe(404);
  });

  it("user not found without email", async () => {
    const response = await supertest(app).post("/api/v1/users/auth")
      .send({ email: "", password: 'Test@123' });
    expect(response.status).toBe(400);
  })
  
})



