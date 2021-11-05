import { Request, Response } from "express";

export function logRequests(req: Request, res: Response, next) {
    console.log(req.method, req.originalUrl, req.body);

    next();
};

/**
 * Checks if request is authenticated, and if user in session matches the user making the request
 */
export function isPermitted(req: Request, res: Response, next) {
    const username = req.query.username;

    // @ts-ignore -- @todo: extend req.user type with username, userId
    if (req.isAuthenticated() && username === req.user.username) {
        next()
    } else {
        res.status(403).json({ message: 'Permission denied'})
    }
}