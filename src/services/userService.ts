import UserRepositoryClass from "../repositories/userRepository";

export class UserService {
    private userRepository: UserRepositoryClass;

    constructor(userRepository: UserRepositoryClass) {
        this.userRepository = userRepository;
    }

    async loginValidation(username: string, password: string) { 
        
        const user = await this.userRepository.getUser(username);

        if (user.password === password) {
            return { status: 200, message: "Login successful" };
        } else {
            return { status: 401, message: "Not authorized" };
        }
    }
};