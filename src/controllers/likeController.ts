import { getSingleBlog } from "../services/blogService";
import { Request, Response } from "express";
import { createLike, dislike, getAllLikes } from "../services/likeService";

export const like = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog: any = await getSingleBlog(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const Like = await createLike(id, req.body.user)
    res.status(200).json(Like);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getLikes = async (req: Request, res: Response) => {
    try{
        const likes: any = await getAllLikes(req.params.id);
        res.status(200).json({
            status: "success",
            likes: likes.length,
            data: likes
        })
    } catch(err: any){
        res.status(400).json({ error: err.message })
    }
}


export const removeLike = async (req: Request, res: Response) => {
    try{
        const like = await dislike(req.params.likeId);
        res.status(200).json({
          status: "success",
          message: "your like was removed!"
        })
    } catch(err: any){
        res.status(400).json({
            status: "Error",
            message: err.message
        })
    }
}