import mongoose from "mongoose";
import config from "./index";   

const connectDb = async () => {
    try {
        await mongoose.connect(config.mongoUrl);
    } catch (error) {
        throw new Error("Error connecting to database");
    }
};

export default connectDb;