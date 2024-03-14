import mongoose from "mongoose"

export interface likes {
    blog: String,
    user: String,
    like: Boolean

}

const likeSchema = new mongoose.Schema<likes>({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    user: {
        type: String,
        required: true
    },
    like:{
        type: Boolean,
        default: true
    }
})

export default mongoose.model<likes>('Likes', likeSchema)