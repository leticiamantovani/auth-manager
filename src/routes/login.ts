import express, { Router } from 'express';
import { LoginController } from '../controllers/loginController'; 

export class LoginRouter {
    private router: Router;
    private loginController: LoginController;

    constructor(loginController: LoginController) {
        this.router = express.Router();
        this.loginController = loginController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.loginController.loginHandler.bind(this.loginController));
    }

    public getRouter(): Router {
        return this.router;
    }
}
