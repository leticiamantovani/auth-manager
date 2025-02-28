

import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { IUserController } from '../interfaces/IUserController';

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
            const { username, password, role } = req.body;
            const response = await this.userService.registerUser(username, password, role);
            return res.status(response.status).send({ message: response.message, token: response.token });
        } catch (error) {
            return res.status(500).send(error);
        }
    }
};