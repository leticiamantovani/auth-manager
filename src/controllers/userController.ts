

import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { IUserController } from '../interfaces/IUserController';
import * as jwt from "jsonwebtoken";
export class UserController implements IUserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    };

    public async loginHandler(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;
            const response = await this.userService.loginValidation(username, password);
            return res.status(response.status).send(response.message);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    public async registerHandler(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;
            const response = await this.userService.registerUser(username, password);
            return res.status(response.status).send({ message: response.message, token: response.token });
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    public async adminHandler(req: Request, res: Response): Promise<Response> {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { role: string };

            if (decoded.role !== "admin") {
                return res.status(403).json({ message: "Invalid Access, only admin can access this route." });
            }
        } catch (error) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        return res.status(200).json({ message: "Admin access granted" });
    }

    public async userHandler(req: Request, res: Response): Promise<Response> {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { role: string };

            if (decoded.role !== "user") {
                return res.status(403).json({ message: "Invalid Access, only users can access this route." });
            }
        } catch (error) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        return res.status(200).json({ message: "User access granted" });
    }

    public async updateHandler(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;
            const response = await this.userService.updateUsername(username, password);
            return res.status(response.status).send(response.message);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    public async deleteHandler(req: Request, res: Response) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const deletedUser = await this.userService.deleteUser(userId);

            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error in deleteHandler:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

};