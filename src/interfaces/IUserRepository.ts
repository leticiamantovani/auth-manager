import { Document } from "mongoose";
import IUser from "./IUser";

export interface IUserRepository {
    createUser(username: string, password: string, role: string): Promise<Document>;
    getUser(username: string): Promise<IUser | null>;
    updateUser(username: string, password: string, role: string): Promise<any>;
    deleteUser(username: string): Promise<any>;
}
