

import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    };

    public async loginHandler(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const response = await this.userService.loginValidation(username, password);
            res.status(response.status).send(response.message);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};