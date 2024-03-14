import Comment from "../models/comment";
import Blog from "../models/blog";
import { Request, Response } from "express";

export const addComment = async (req: Request, res: Response) => {
    try {
      const blogId = req.params.id;
      const { name, email, content} = req.body;
      const blog = await Blog.findOne({ _id: blogId });
      if (!blog) {
        return res.status(404).send({ error: "Blog Not Found" });
      }
      const newComment = await Comment.create({
        name: name,
        email: email,
        content: content,
        blog: blog._id,
      });
      res.status(201).json({
        status: "success",
        message: "your comment was added successfully!",
        data: newComment});
    } catch (error: any) {
      res.status(400).json({ error: error });
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {
      const blogId = req.params.id;
      const comments = await Comment.find({blog: blogId});
      if (comments) {
        return res.status(200).json({
            status: "success", 
            comments: comments.length,
            data: comments
        });
    } else {
        res.status(404).json({ error: 'No comment found'});
    }
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  };