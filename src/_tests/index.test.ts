import supertest from "supertest";
import app from "../app";
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import fs from "fs"
import path from "path"
import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST as string);
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

describe("POST /", () => {
    it('responds with status 201 user created!', async () => {
      const response = await supertest(app).post("/api/v1/users").send({
        name: "Arthur",
        email: "arthur@gmail.com",
        password: "Test@123",
        role: "user"
      });
      expect(response.body.status).toBe("success");
    })

});

describe("user login", () => {
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
  
})


// it("Get single blogs", async () => {
//   const response = await supertest(app).get(`/api/v1/blogs/${id}`);
//   expect(response.status).toBe(200);
// });

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


    it("should create a new blog", async () => {
      const response = await supertest(app).post("/api/v1/blogs")
      .send({
        title: "Test Blog",
        description: "this is a blog description",
        image: ""
      }).set('Authorization', 'Bearer ' + token)
      expect(response.status).toBe(201);
    })


})



