const Blog = require("../models/blog");
const uploadFile = require("../helpers/cloud");

const createBlog = async (req, res) => {
    try{
        const result = await uploadFile(req.file, res);
        const newBlog = await Blog.create({
            title: req.body.title,
            description: req.body.description,
            image: result.secure_url
        });
        res.status(200).json({
            status: "success",
            message: "blog was created successfully!",
            data: newBlog
        })
    } catch(err){
        res.status(400).json({
            status: "error",
            error: err.message
        })
    }
}


const getBlogs = async (req, res) => {
    try{
        const blogs = await Blog.find();
        res.status(200).json({
            status: "success",
            data: blogs
        });
    } catch(err){
        res.status(400).json({
            status: "error",
            error: err.message
        })
    }
}

const getBlogById = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                status: "error",
                message: "blog not found"
            })
        }
        return res.status(200).json({
            status: "success",
            data: blog
        })
    } catch(error){
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        return res.status(404).json({
          status: "failed",
          message: "blog not found",
        });
      }
      return res.status(204).json({
        status: "success",
        message: "blog deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        error,
      });
    }
  };

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if(!blog){
            res.status(404).json({
                status: "error",
                message: "blog not found"
            });
        }
        if (req.body.title) {
            blog.title = req.body.title
        }

        if (req.body.description) {
            blog.description = req.body.description
        }
        if(req.file){
            const result = await uploadFile(req.file, res);
            blog.image = result.secure_url;
        }

        await blog.save()
        res.status(200).json({
            status: "success",
            message: "blog was updated successfully!",
            blog
        })
    } catch(error) {
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
}