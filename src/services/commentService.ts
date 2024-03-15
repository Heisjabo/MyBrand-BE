import Comment from "../models/comment";

export const createComment = async (name: string, email: string, content: string, blog: string ) => {
    const comment = await Comment.create({
        name: name,
        email: email,
        content: content,
        blog: blog
    });
    return comment;
}

export const readComments = async (blogId: string) => {
    const comments = await Comment.find({blog: blogId});
    return comments;
}