import Querry from "../models/querries";
import { QuerryBody } from "../models/querries";

export const addQuerry = async (body: QuerryBody) => {
    const query = await Querry.create(body);
    return query;
}

export const readQuerries = async () => {
    const querries = await Querry.find()
    return querries;
}

export const removeQuerry = async (id: string) => {
    const query = await Querry.findByIdAndDelete(id);
    return query;
}

export const getQueryById = async (id: string) => {
    const query = await Querry.findById(id);
    if(!query){
        throw new Error("Query not found");
    }
}
