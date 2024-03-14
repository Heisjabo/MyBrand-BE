import { Schema, Types, model, Document } from 'mongoose';

interface CommentModel extends Document {
    name: string;
    email: string;
    content: string;
    blog: Types.ObjectId;
}

const commentSchema = new Schema<CommentModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }
});

const Comment = model<CommentModel>('Comment', commentSchema);

export default Comment;