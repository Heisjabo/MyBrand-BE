const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected!");
    } catch(err){
        console.log(err)
    }
}

module.exports = connectDB;