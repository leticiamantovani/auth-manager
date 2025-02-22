

import { Request, Response } from 'express';
import { LoginService } from '../services/loginService';

export class LoginController {
    private loginService: LoginService;

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    };

    public async loginHandler(req: Request, res: Response) {
        const { username, password } = req.body;
        res.status(200).json("Login successful");
        this.loginService.loginValidation(username, password);
    }
};