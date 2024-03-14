"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikes = exports.like = void 0;
const blogService_1 = require("../services/blogService");
const likeService_1 = require("../services/likeService");
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const blog = yield (0, blogService_1.getSingleBlog)(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        const Like = yield (0, likeService_1.createLike)(id, req.body.user);
        res.status(200).json(Like);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.like = like;
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield (0, likeService_1.getAllLikes)(req.params.id);
        res.status(200).json({
            status: "success",
            likes: likes.length,
            data: likes
        });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.getLikes = getLikes;
// export const removeLike = async (req: Request, res: Response) => {
//     try{
//         const like = await dislike(req.params.likeId);
//     } catch(err: any){
//         res.status(400).json({
//             status: "Error",
//             message: err.message
//         })
//     }
// }
