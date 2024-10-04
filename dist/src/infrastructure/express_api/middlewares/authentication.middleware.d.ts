import { NextFunction, Request, Response } from "express";
declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => Promise<void>;
