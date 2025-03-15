import Users from "../models/users";
import { IUserRepository } from "../interfaces/IUserRepository";
import { Document, ObjectId, isValidObjectId } from "mongoose";
import IUser from "../interfaces/IUser";

export default class UserRepository implements IUserRepository {

    async createUser(username: string, password: string): Promise<Document> {
        try {
            return await Users.create({ username, password });
        } catch (error) {
            throw error;
        }
    }

    async getUser(username: string): Promise<IUser | null> {
        try {
            const user = await Users.findOne({ username });
            return user as IUser | null;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId: ObjectId, newUsername: string): Promise<any> {
        try {
            return await Users.updateOne(
                { _id: userId }, 
                { $set: { username: newUsername } } 
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId: string): Promise<any> {
        try {
            return await Users.deleteOne({ _id: userId });
        } catch (error) {
            throw error;
        }
    }

    
    async getUserById(userId: string): Promise<IUser | null> {
        try {
            if (!isValidObjectId(userId)) {
                throw new Error("Invalid user ID");
            }

            const user = await Users.findById(userId);
            return user as IUser | null;
        } catch (error) {
            throw error;
        }
    }
};

