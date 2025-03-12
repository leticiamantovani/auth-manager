import express, { Router } from 'express';
import { UserController } from '../controllers/userController'; 
import jwtMiddleware from "../middlewares/jwt";
import { IUserRouter } from '../interfaces/IUserRouter';

export class UserRouter implements IUserRouter {
    private router: Router;
    private userController: UserController;

    constructor(userController: UserController) {
        this.router = express.Router();
        this.userController = userController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/login', jwtMiddleware, (req, res, next) => {
            this.userController.loginHandler(req, res).catch(next);
        });
        this.router.post('/register', (req, res, next) => {
            this.userController.registerHandler(req, res).catch(next);
        });
        this.router.get('/admin', (req, res, next) => {
            this.userController.adminHandler(req, res).catch(next);
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}
