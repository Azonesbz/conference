import { User } from "../entities/user.entity";
import { IUserRepository } from "../ports/user-repository.interface";
export declare class InMemoryUserRepository implements IUserRepository {
    private users;
    create(user: User): Promise<void>;
    findByEmailAddress(emailAddress: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
