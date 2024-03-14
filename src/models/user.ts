import mongoose from "mongoose";

export interface UserType {
    name?: string,
    email?: string,
    role?: string,
    password?: string
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'User'
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

export default User;