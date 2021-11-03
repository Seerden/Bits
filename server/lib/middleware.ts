import { Request, Response } from "express";

export function logRequests(req: Request, res: Response, next) {
    console.log(req.method, req.originalUrl);

    next();
};