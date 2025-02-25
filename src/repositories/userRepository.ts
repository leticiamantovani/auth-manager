import Users from "../models/users";

export default class UserRepository {

    async createUser(username: string, password: string, role:string) {
        try {
            return await Users.create({username, password, role});
        } catch (error) {
            return error;
        }
    }

    async getUser(username: string){
        try {
            return await Users.findOne({username});
        } catch (error) {
            return error;
        }
    }

    async updateUser(username: string, password: string, role: string){
        try {
            return await Users.updateOne({username, password, role});
        } catch (error) {
            return error;
        }
    }

    async deleteUser(username: string){
        try {
            return await Users.deleteOne({username});
        } catch (error) {
            return error;
        }
    }
};