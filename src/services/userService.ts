import User from "../models/user";
import { UserType } from "../models/user";

export const createUser = async (user: UserType) => {
    const newUser = await User.create(user);
    return newUser;
}

export const getUsers = async () => {
    const users = await User.find();
    return users;
}

export const getSingleUser = async (id: string) => {
    const user = await User.findById(id);
    if(!user){
        throw new Error("User not found")
    }
    return user;
}

export const checkUser = async (email: string) => {
    const user = await User.findOne({ email: email});
    return user;
}

export const removeUser = async (id: string) => {
    const user = await User.findByIdAndDelete(id);
    if(!user){
        throw new Error("User Not Found");
    }
    return
}

export const editUser = async (id: string, user: UserType) => {
    const newUser = await User.findByIdAndUpdate(id, user);
    return newUser
}