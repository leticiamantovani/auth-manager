import UserRepository from "../../repositories/userRepository";
import Users from "../../models/users";
import { Types } from "mongoose";

jest.mock("../../models/users", () => {
    return {
        findOne: jest.fn(),
        create: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn(),
    };
});

beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {}); 
});

describe("UserRepository", () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
        jest.clearAllMocks(); 
    });

    it("should create a user if it has all parameters values", async () => {
        const mockUser = {
            _id: new Types.ObjectId(),
            username: "leticia",
            password: "password",
            role: "admin",
        };

        (Users.create as jest.Mock).mockResolvedValue(mockUser);

        const response = await userRepository.createUser("leticia", "password", "admin");

        expect(response).toEqual(mockUser);
        expect(Users.create).toHaveBeenCalledWith({ username: "leticia", password: "password", role: "admin" });
    });

    it("should throw a database error when creating a user", async () => {
        (Users.create as jest.Mock).mockRejectedValue(new Error("Internal Server Error"));

        await expect(userRepository.createUser("leticia", "password", "admin"))
            .rejects.toThrow("Internal Server Error");

        expect(Users.create).toHaveBeenCalledWith({ username: "leticia", password: "password", role: "admin" });
    });

    it("should return a user when getUser is called", async () => {
        const mockUser = {
            _id: new Types.ObjectId(),
            username: "leticia",
            password: "password",
            role: "admin",
        };

        (Users.findOne as jest.Mock).mockResolvedValue(mockUser);

        const response = await userRepository.getUser("leticia");

        expect(response).toEqual(mockUser);
        expect(Users.findOne).toHaveBeenCalledWith({ username: "leticia" });
    });

    it("should throw an error when getUser encounters a database issue", async () => {
        (Users.findOne as jest.Mock).mockRejectedValue(new Error("Database Error"));

        await expect(userRepository.getUser("leticia")).rejects.toThrow("Database Error");

        expect(Users.findOne).toHaveBeenCalledWith({ username: "leticia" });
    });

    it("should update a user when updateUser is called", async () => {
        (Users.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

        const response = await userRepository.updateUser("leticia", "newpassword", "user");

        expect(response).toEqual({ modifiedCount: 1 });
        expect(Users.updateOne).toHaveBeenCalledWith(
            { username: "leticia" }, 
            { password: "newpassword", role: "user" } 
        );
    });

    it("should throw an error when updateUser encounters a database issue", async () => {
        (Users.updateOne as jest.Mock).mockRejectedValue(new Error("Update Failed"));

        await expect(userRepository.updateUser("leticia", "newpassword", "user"))
            .rejects.toThrow("Update Failed");

        expect(Users.updateOne).toHaveBeenCalledWith(
            { username: "leticia" }, 
            { password: "newpassword", role: "user" }
        );
    });

    it("should delete a user when deleteUser is called", async () => {
        (Users.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });

        const response = await userRepository.deleteUser("leticia");

        expect(response).toEqual({ deletedCount: 1 });
        expect(Users.deleteOne).toHaveBeenCalledWith({ username: "leticia" });
    });

    it("should throw an error when deleteUser encounters a database issue", async () => {
        (Users.deleteOne as jest.Mock).mockRejectedValue(new Error("Delete Failed"));

        await expect(userRepository.deleteUser("leticia")).rejects.toThrow("Delete Failed");

        expect(Users.deleteOne).toHaveBeenCalledWith({ username: "leticia" });
    });
});
