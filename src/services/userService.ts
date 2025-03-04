import UserRepositoryClass from "../repositories/userRepository";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/index";
import bcrypt from "bcrypt";

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


    async registerUser(username: string, password: string, role: string) {
        try {
            const user = await this.userRepository.getUser(username);
            if (user) {
                return { status: 409, message: "User already exists" };
            }

            const hashPassword = await bcrypt.hash(password, 10);
            await this.userRepository.createUser(username, hashPassword, role);

            const token = jsonwebtoken.sign({ username }, config.jwtSecret, { expiresIn: '1h' });

            return { status: 201, message: "User created", token };

        } catch (error) {
            console.error("Error in registerUser:", error);
            return { status: 500, message: "Internal Server Error" };
        }
    }
};