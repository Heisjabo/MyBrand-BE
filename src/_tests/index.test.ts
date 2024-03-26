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
import Querry from "../models/querries";


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST as string);
  });

afterAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Querry.deleteMany({});
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
  let existingBlog: any;

  beforeAll(async () => {
    existingBlog = new Blog({
      title: "Example Blog",
      description: "This is an example blog",
      image: "testImage.jpg",
    });
    await existingBlog.save();
  });

    it("should return all blogs", async () => {
        const response = await supertest(app).get("/api/v1/blogs");
        expect(response.status).toBe(200);
    });

    it("should return a single blog", async () => {
      const response = await supertest(app).get(`/api/v1/blogs/${existingBlog._id}`)
      expect(response.status).toBe(200)
    })

    it("should delete an existing blog", async () => {
      const response = await supertest(app).delete(`/api/v1/blogs/${existingBlog._id}`)
      .set('Authorization', 'Bearer ' + token)
      expect(response.status).toBe(204)
    })

    it("should return 401 when deleting a blog without authorization", async () => {
      const response = await supertest(app).delete(`/api/v1/blogs/${existingBlog._id}`)
      expect(response.status).toBe(401)
    })

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

// Test adding a comment to a blog
describe("Add Comment to Blog", () => {
  let existingBlog: any;

  beforeAll(async () => {
    // Create an example blog
    existingBlog = new Blog({
      title: "Example Blog",
      description: "This is an example blog",
      image: "testImage.jpg",
    });
    await existingBlog.save();
  });

  it("should add a comment to a blog when user is authenticated", async () => {
    const commentData = {
      content: "This is a test comment",
    };

    const response = await supertest(app)
      .post(`/api/v1/blogs/${existingBlog._id}/comments`)
      .set('Authorization', 'Bearer ' + token)
      .send(commentData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "your comment was added successfully!");
  });


  it("should return 400 if comment data is invalid", async () => {
    const invalidCommentData = {
       content: "",
    };
   
    const response = await supertest(app)
       .post(`/api/v1/blogs/${existingBlog._id}/comments`)
       .set('Authorization', 'Bearer ' + token)
       .send(invalidCommentData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Comment validation failed: content: Path `content` is required.");
   });
  })

describe("test liking on a blog", () => {
  let existingBlog: any;
  beforeAll(async () => {
    existingBlog = new Blog({
      title: "Example Blog",
      description: "This is an example blog",
      image: "testImage.jpg",
    });
    await existingBlog.save();
  });

  it("should return 401 for unauthenticated like addition", async () => {
    const response = await supertest(app)
      .post(`/api/v1/blogs/${existingBlog._id}/likes`)
    expect(response.status).toBe(401);
  });

  it("should return 201 for authenticated like addition", async () => {
    const response = await supertest(app)
      .post(`/api/v1/blogs/${existingBlog._id}/likes`)
      .set('Authorization', 'Bearer ' + token)
    expect(response.status).toBe(201);
  });
})

describe("Test queries", () => {
  it("should return 400 when adding a query without all fields", async () => {
    const response = await supertest(app)
    .post("/api/v1/queries")
    .send({
      name: "Jabo",
      email: "jabo@gmail.com",
      message: ""
    });
    expect(response.status).toBe(400)
  })

  it("should return 201 when a query is created", async () => {
    const response = await supertest(app)
    .post("/api/v1/queries")
    .send({
      name: "Jabo",
      email: "jabo@gmail.com",
      message: "this is a test message"
    });
    expect(response.status).toBe(201)
  })
})
