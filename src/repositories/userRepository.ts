import Users from "../models/users";
import { IUserRepository } from "../interfaces/IUserRepository";
import { Document } from "mongoose";
import IUser from "../interfaces/IUser";

export default class UserRepository implements IUserRepository {

    async createUser(username: string, password: string, role: string): Promise<Document> {
        try {
            return await Users.create({ username, password, role });
        } catch (error) {
            throw error;
        }
    }

    async getUser(username: string): Promise<IUser | null> {
        try {
            const user = await Users.findOne({ username }).lean();
            return user as IUser | null;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(username: string, password: string, role: string): Promise<any> {
        try {
            return await Users.updateOne({ username, password, role });
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(username: string): Promise<any> {
        try {
            return await Users.deleteOne({ username });
        } catch (error) {
            throw error;
        }
    }
};