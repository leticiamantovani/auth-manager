import UserRepositoryClass from "../repositories/userRepository";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/index";
import bcrypt from "bcrypt";
import { ObjectId } from "mongoose";

export class UserService {
    private userRepository: UserRepositoryClass;

    constructor(userRepository: UserRepositoryClass) {
        this.userRepository = userRepository;
    }

    async loginValidation(username: string, password: string) { 
        try {
            const user = await this.userRepository.getUser(username) as { password: string } | null;
    
            const isPasswordValid = await bcrypt.compare(password, user?.password as string);

            if (!user) {
                return { status: 404, message: "User not found" }; 
            }

            if (!isPasswordValid) {
                return { status: 401, message: "Invalid password" }; 
            }
            
            return { status: 200, message: "Login successful" }; 
        } catch (error) {
            console.error("Error in registerUser:", error);
            return { status: 500, message: "Internal Server Error" };
        }
    }


    async registerUser(username: string, password: string) {
        try {
            const user = await this.userRepository.getUser(username);
            if (user) {
                return { status: 409, message: "User already exists" };
            }

            const hashPassword = await bcrypt.hash(password, 10);
            await this.userRepository.createUser(username, hashPassword);

            const token = jsonwebtoken.sign({ username }, config.jwtSecret, { expiresIn: '1h' });

            return { status: 201, message: "User created", token };

        } catch (error) {
            console.error("Error in registerUser:", error);
            return { status: 500, message: "Internal Server Error" };
        }
    }

    async updateUsername(oldUsername: string, newUsername: string): Promise<any> {
        try {
            const user = await this.userRepository.getUser(oldUsername);

            if (!user) {
                return { status: 404, message: "User not found" };
            }

            const existingUser = await this.userRepository.getUser(newUsername);
            if (existingUser) {
                return { status: 400, message: "Username already taken" };
            }

            await this.userRepository.updateUser(user._id as unknown as ObjectId, newUsername);

            return { status: 200, message: "Username updated successfully" };
        } catch (error) {
            console.error("Error in updateUsername:", error);
            return { status: 500, message: "Internal Server Error" };
        }
    }

    
    async deleteUser(userId: string): Promise<any> {
        try {
            const user = await this.userRepository.getUserById(userId);

            if (!user) {
                return { status: 404, message: "User not found" };
            }

            await this.userRepository.deleteUser(userId)

            return { status: 200, message: "Username deleted successfully" };
        } catch (error) {
            console.error("Error in deleteUser:", error);
            return { status: 500, message: "Internal Server Error" };
        }
    }
};