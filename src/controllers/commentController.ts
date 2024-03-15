import { Request, Response } from "express";
import { getSingleBlog } from "../services/blogService";
import { createComment, readComments } from "../services/commentService";

export const addComment = async (req: Request, res: Response) => {
  let user: any = req.user;
    try {
      const blogId = req.params.id;
      const { content } = req.body;
      const blog: any = await getSingleBlog(blogId);
      if (!blog){
        return res.status(404).send({ error: "Blog Not Found" });
      }
      const newComment = await createComment(user.name, user.email, content, blog._id);
      res.status(201).json({
        status: "success",
        message: "your comment was added successfully!",
        data: newComment});
    } catch (error: any) {
      res.status(400).json({ status: "Error", message: error.message });
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {
      const blogId = req.params.id;
      const comments = await readComments(blogId);
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