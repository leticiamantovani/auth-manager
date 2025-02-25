import express, { Router } from 'express';
import { UserController } from '../controllers/userController'; 

export class UserRouter {
    private router: Router;
    private userController: UserController;

    constructor(userController: UserController) {
        this.router = express.Router();
        this.userController = userController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.userController.loginHandler.bind(this.userController));
    }

    public getRouter(): Router {
        return this.router;
    }
}
