import { Document } from "mongoose";

export interface IUserRepository {
    createUser(username: string, password: string, role: string): Promise<Document>;
    getUser(username: string): Promise<Document | null>;
    updateUser(username: string, password: string, role: string): Promise<any>;
    deleteUser(username: string): Promise<any>;
}
