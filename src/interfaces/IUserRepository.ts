import { Document, ObjectId } from "mongoose";
import IUser from "./IUser";

export interface IUserRepository {
    createUser(username: string, password: string, role: string): Promise<Document>;
    getUser(username: string): Promise<IUser | null>;
    updateUser(userId: ObjectId, newUsername: string): Promise<any>;
    deleteUser(userId: string): Promise<any>;
}
