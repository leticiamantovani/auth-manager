import Users from "../models/users";

export default class UserRepository {

    async createUser(username: string, password: string, role:string) {
        try {
            return await Users.create({username, password, role});
        } catch (error) {
            throw error;
        }
    }

    async getUser(username: string): Promise<Document | null> {
        try {
            return await Users.findOne({username});
        } catch (error) {
            throw error;
        }
    }

    async updateUser(username: string, password: string, role: string){
        try {
            return await Users.updateOne({username, password, role});
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(username: string){
        try {
            return await Users.deleteOne({username});
        } catch (error) {
            throw error;
        }
    }
};