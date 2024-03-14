import Likes from "../models/likes";

export const createLike = async (id: string, user: string) => {
    const Like = await Likes.create({
        blog: id,
        user: user,
        like: false
    });
    return Like;
}

export const dislike = async (id: string) => {
    const like = await Likes.findByIdAndDelete(id)
}

export const getAllLikes = async (id: string) => {
    const likes = await Likes.find({ blog: id });
    return likes;
}