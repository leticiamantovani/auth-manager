import { UserService } from "../../services/userService";
import UserRepository from "../../repositories/userRepository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import IUser from "../../interfaces/IUser";
import config from "../../config";

global.console.error = jest.fn();
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("UserService", () => {
    let userService: UserService;
    let userRepositoryMock: jest.Mocked<UserRepository>;

    beforeEach(() => {
        userRepositoryMock = {
            createUser: jest.fn(),
            getUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn()
        } as unknown as jest.Mocked<UserRepository>;

        userService = new UserService(userRepositoryMock);
    });

    describe("Login function tests", () => {
        it("should return status 200 when user tries to login with correct credentials", async () => {
            userRepositoryMock.getUser.mockResolvedValue({ username: "leticia", password: "test" } as IUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            const response = await userService.loginValidation("leticia", "test");

            expect(response).toEqual({ status: 200, message: "Login successful" });
        });

        it("should return status 401 when user tries to login with incorrect password", async () => {
            userRepositoryMock.getUser.mockResolvedValue({ username: "leticia", password: "test" } as IUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            const response = await userService.loginValidation("leticia", "wrongpassword");

            expect(response).toEqual({ status: 401, message: "Invalid password" });
        });

        it("should return status 500 when database returns an error", async () => {
            userRepositoryMock.getUser.mockRejectedValue(new Error("Internal server error"))

            const response = await userService.loginValidation("leticia", "leticia123");

            expect(response).toEqual({ status: 500, message: "Internal Server Error" });
        });

        it("should return status 404 when user is not found in the database", async () => {
            userRepositoryMock.getUser.mockResolvedValue(null);

            const response = await userService.loginValidation("leticia", "leticia123");

            expect(response).toEqual({ status: 404, message: "User not found" });
        });

    });

    describe("registerUser function tests", () => {
        it("should return status 409 when the user already exists", async () => {
            userRepositoryMock.getUser.mockResolvedValue({ username: "leticia" } as IUser);

            const response = await userService.registerUser("leticia", "password123");

            expect(response).toEqual({ status: 409, message: "User already exists" });
            expect(userRepositoryMock.getUser).toHaveBeenCalledWith("leticia");
            expect(userRepositoryMock.createUser).not.toHaveBeenCalled();
        });

        it("should return status 201 when a new user is created successfully", async () => {
            userRepositoryMock.getUser.mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
            (jsonwebtoken.sign as jest.Mock).mockReturnValue("fakeToken");

            const response = await userService.registerUser("leticia", "password123");

            expect(response).toEqual({
                status: 201,
                message: "User created",
                token: "fakeToken",
            });
            expect(userRepositoryMock.getUser).toHaveBeenCalledWith("leticia");
            expect(userRepositoryMock.createUser).toHaveBeenCalledWith("leticia", "hashedPassword");
            expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
            expect(jsonwebtoken.sign).toHaveBeenCalledWith(
                { username: "leticia" },
                config.jwtSecret,
                { expiresIn: '1h' }
            );
        });

        it("should return status 500 when databas returns an error", async () => {
            userRepositoryMock.getUser.mockRejectedValue(new Error("Error"));

            const response = await userService.registerUser("leticia", "password123");

            expect(response).toEqual({
                status: 500,
                message:  "Internal Server Error",
            });
            expect(userRepositoryMock.getUser).toHaveBeenCalledWith("leticia");
            expect(userRepositoryMock.createUser).not.toHaveBeenCalledWith("leticia", "hashedPassword");
            expect(bcrypt.hash).not.toHaveBeenCalledWith("password123", 10);
            expect(jsonwebtoken.sign).not.toHaveBeenCalledWith(
                { username: "leticia" },
                config.jwtSecret,
                { expiresIn: '1h' }
            );
        });

    });

});
