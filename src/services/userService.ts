import UserRepositoryClass from "../repositories/userRepository";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/index";

export class UserService {
    private userRepository: UserRepositoryClass;

    constructor(userRepository: UserRepositoryClass) {
        this.userRepository = userRepository;
    }

    async loginValidation(username: string, password: string) { 
        
        const user = await this.userRepository.getUser(username) as { password: string } | null;
        if (user?.password === password) {
            return { status: 200, message: "Login successful" };
        } else {
            return { status: 401, message: "Not authorized" };
        }
    }


    async registerUser(username: string, password: string, role: string) {
        const user = await this.userRepository.getUser(username);
        if (user) {
            return { status: 409, message: "User already exists" };
        } else {

            await this.userRepository.createUser(username, password, role);

            const token = jsonwebtoken.sign({ username }, config.jwtSecret, { expiresIn: '1h' });

            return { status: 201, message: "User created", token };
        }
    }
};