import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/index";


const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const headers = req.headers['authorization'];
    const token = headers && headers.split(' ')[1];

    if (!token) {
        res.status(403).send({
            message: 'A token is required for authentication'
        });
    }

    try {
        const decoded = jsonwebtoken.verify(token as string, config.jwtSecret);
        req.body.user = decoded;
    } catch (err) {
        res.status(401).send({
            message: 'Invalid Token'
        });
    }

    next();

}

export default jwtMiddleware;