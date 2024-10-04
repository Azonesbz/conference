import { Model } from "mongoose";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../ports/user-repository.interface";
import { MongoUser } from "./mongo-user";
export declare class MongoUserRepository implements IUserRepository {
    private readonly model;
    private readonly mapper;
    constructor(model: Model<MongoUser.UserDocument>);
    findByEmailAddress(emailAddress: string): Promise<User | null>;
    create(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
}
