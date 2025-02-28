import { Request, Response } from "express";

export interface IUserController {
    loginHandler(req: Request, res: Response): Promise<Response>;
    registerHandler(req: Request, res: Response): Promise<Response>;
}