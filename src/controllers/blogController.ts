import uploadFile from "../helpers/cloud";
import { Request, Response } from "express";
import {
  getBlog,
  newBlog,
  getSingleBlog,
  deleteBlogById,
} from "../services/blogService";
import { blogSchema, updateBlogSchema } from "../utils/validations";

export const createBlog = async (req: Request, res: Response) => {
    const file: any = req.file;
    try {
      const { error, value } = blogSchema.validate({
        title: req.body.title,
        description: req.body.description,
        image: file ? file.path : undefined,
      });
      if (error) {
        return res.status(400).json({
          status: "Error",
          message: error.details[0].message,
        });
      }
      const result = await uploadFile(file, res);
      const blog = await newBlog({
        title: value.title,
        description: value.description,
        image: result,
      });
      return res.status(201).json({
        status: "success",
        message: "Blog was created successfully!",
        data: blog,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        error: error.message,
      });
    }
  };
  

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await getBlog();
    res.status(200).json({
      status: "success",
      data: blogs,
    });
  } catch (err: any) {
    res.status(400).json({
      status: "error",
      error: err.message,
    });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const blog = await getSingleBlog(id);
    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const blog: any = await deleteBlogById(id);
    if (!blog) {
      return res.status(404).json({
        status: "failed",
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "failed",
      error,
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const file: any = req.file;
    try {
      const { error, value } = updateBlogSchema.validate({
        title: req.body.title,
        description: req.body.description,
        image: file ? file.path : undefined,
      });
      if (error) {
        return res.status(400).json({
          status: "Error",
          message: error.details[0].message,
        });
      }
    const blog: any = await getSingleBlog(req.params.id);
    if (!blog) {
      res.status(404).json({
        status: "error",
        message: "Blog not found",
      });
      return;
    }

    if (value.title) {
      blog.title = value.title;
    }

    if (value.description) {
      blog.description = value.description;
    }

    if (req.file) {
      const result = await uploadFile(req.file, res);
      blog.image = result;
    }
    if(!value.title && !value.description && !req.file){
      return res.status(400).json({
        status: "Error",
        message: "please add any field to update"
      })
    }
    await blog.save();
    res.status(200).json({
      status: "success",
      message: "Blog was updated successfully!",
      blog,
    });
    
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
