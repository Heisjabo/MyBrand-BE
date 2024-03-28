import { Request, Response } from "express";
import { createUser, getUsers,checkUser, removeUser, editUser, getSingleUser } from "../services/userService"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userSchema, authSchema, updateUserSchema } from "../utils/validations";
dotenv.config();


export const registerUser = async (req: Request, res: Response) => {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: "Error",
                message: error.details[0].message
            });
        }

        const user = await checkUser(value.email);
        if (user) {
            return res.status(400).json({
                status: "Error",
                message: "User with this email already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value.password, salt);

        const newUser = await createUser({
            name: value.name,
            email: value.email,
            password: hashedPassword,
            role: value.role
        });

        return res.status(201).json({
            status: "success",
            message: "User was created successfully!",
        });
    } catch (err: any) {
        return res.status(400).json({
            status: "Error",
            message: err.message
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await getUsers();
        res.status(200).json({
            status: "success",
            data: users
        })
    } catch(err: any){
        res.status(500).json({
            status: "Error",
            message: err.message
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try{
        const user = await getSingleUser(req.params.id);
        res.status(200).json({
            status: "success",
            data: user
        });
    } catch(err: any){
        res.status(400).json({
            status: "Error",
            message: err.message
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{
        const user: any = await removeUser(req.params.id);
        return res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });
    } catch(err: any){
        res.status(400).json({
            status: "Error",
            message: err.message
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try{
        const { error, value } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'Error',
                message: error.details[0].message,
            });
        }
        if(!value.name && !value.password && !value.role ){
            return res.status(400).json({
                status: "Error",
                message: "Please add any field to update"
            });
        }
        const user = await editUser(req.params.id, value);
        res.status(201).json({
            status: "success",
            message: "user updated successfully!",
        });
    } catch(err: any){
        res.status(500).json({
            status: "Error",
            message: err.message
        })
    }
}

export const authUser = async (req: Request, res: Response) => {
    try{
        const { error, value } = authSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: "Error",
                message: error.details[0].message
            });
        }
        const user = await checkUser(value.email);
        if(!user){
            return res.status(404).json({
                status: "Error",
                message: "user not found"
            });
        }
        const secret: any = process.env.JWT_SECRET;
        if(user && await bcrypt.compare(req.body.password, user.password)){
            return res.status(200).json({
                status: "success",
                message: "you are logged in",
                token: jwt.sign({ userId: user._id }, secret, { expiresIn: "1d"}),
                role: user.role
            });
        } else {
            return res.status(401).json({
                status: "Error",
                message: "Incorrect password"
            })
        }
    } catch(err: any){
        return res.status(400).json({
            status: "Error",
            message: err.message
        })
    }
}


