import Blog from "../models/blog";

export const getBlog = async () => {
        const blogs = await Blog.find();
        return blogs
}

export const newBlog = async (blog: object) => {
    const newblog = await Blog.create(blog)
    return newblog;
}

export const getSingleBlog = async (id: string) => {
   const blog = await Blog.findById(id);
   return blog;
}

export const deleteBlogById = async (id: string) => {
    const response = await Blog.findByIdAndDelete(id);
    return response;
}
