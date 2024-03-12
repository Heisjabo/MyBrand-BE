const Blog = require("../models/blog");

const getBlog = async () => {
        const blogs = await Blog.find();
        return blogs
}

const newBlog = async (blog) => {
    const newblog = await Blog.create(blog)
    return newblog;
}

const getSingleBlog = async (id) => {
   const blog = await Blog.findById(id);
   return blog;
}

const deleteBlogById = async (id) => {
    await Blog.findByIdAndDelete(id);
}

module.exports = {
    getBlog,
    newBlog,
    getSingleBlog,
    deleteBlogById
}