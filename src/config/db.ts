import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://user123:senha123@localhost:27017");
    } catch (error) {
        throw new Error("Error connecting to database");
    }
};

export default connectDb;