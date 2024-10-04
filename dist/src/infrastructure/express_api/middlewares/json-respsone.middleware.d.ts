import { NextFunction, Request, Response } from "express";
export interface ApiResponse {
    success: boolean;
    data: any;
    error?: {
        message: string;
        code: number;
    };
}
declare module 'express-serve-static-core' {
    interface Response {
        jsonSuccess(data: any, statusCode: number): void;
        jsonError(error: any, statusCode: number): void;
    }
}
export declare function jsonResponseMiddleware(req: Request, res: Response, next: NextFunction): void;
