import mongoose from "mongoose";

export interface QuerryBody {
    name: string,
    email: string,
    message: string
}

const querySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Querry = mongoose.model("Querry", querySchema);

export default Querry;