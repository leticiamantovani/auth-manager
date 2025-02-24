const Users = require('../models/users');

export default class UserRepositoryClass {

    async createUser(username: string, password: string, role:string) {
        try {
            return await Users.create({username, password, role});
        } catch (error) {
            return error;
        }
    }

    async getUser(username: string){
        try {
            return await Users.get({username});
        } catch (error) {
            return error;
        }
    }

    async updateUser(username: string, password: string, role: string){
        try {
            return await Users.update({username, password, role});
        } catch (error) {
            return error;
        }
    }

    async deleteUser(username: string){
        try {
            return await Users.delete({username});
        } catch (error) {
            return error;
        }
    }
};