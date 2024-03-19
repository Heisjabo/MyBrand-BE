import jwt from "jsonwebtoken";
import { getSingleUser } from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { UserType } from "../models/user";
import dotenv from "dotenv"
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: UserType;
        }
    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    try {
        if (!user) {
            return res.status(401).json({
                status: "Unauthorized",
                message: "you are not logged in, login to continue!",
            });
        }
        const isAdmin = user?.role === "admin";
        if(!isAdmin){
            return res.status(401).json({
                status: "Unauthorized",
                message: "only admin user have this access"
            });
        }
        if(user && isAdmin) {
            next();
        } else {
            throw new Error("you are not authorised for this action")
        }
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
