import { NextFunction, Request, Response } from 'express';
import { AwilixContainer } from 'awilix';
export declare const organizeConference: (container: AwilixContainer) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const changeSeats: (container: AwilixContainer) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
