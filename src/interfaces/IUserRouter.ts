import { Router } from "express";

export interface IUserRouter {
    getRouter(): Router;
}