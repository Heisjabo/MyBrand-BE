import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("mongodb connected!");
    } catch(err){
        console.log(err)
    }
}

export default connectDB;