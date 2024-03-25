import supertest from "supertest";
import app from "../app";
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import User from "../models/user";
import fs from "fs";
import path from "path";
import Blog from "../models/blog";


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST as string);
  });

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
})

let token: string;

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
    });

    it("should return error 400 when Without title field", async () => {
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

    // const filePath = path.join(__dirname, "testImg.jpg");
    // console.log(filePath);
    //   if (!fs.existsSync(filePath)) {
    //      throw new Error("Test image file not found");
    //   }

    // it("should create a new blog", async () => {
    //   const response = await supertest(app)
    //   .post("/api/v1/blogs")
    //   .set('Authorization', 'Bearer ' + token)
    //   .field("title", "New Blog")
    //   .field("description", "This is a blog description")
    //   .attach("image", filePath)
    //   expect(response.body.status).toBe("success")
    // }, 10000)



})



