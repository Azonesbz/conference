import { User } from "../entities/user.entity";
import { IAuthenticator } from "../ports/authenticator.interface";
import { IUserRepository } from "../ports/user-repository.interface";
export declare class BasicAuthenticator implements IAuthenticator {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    authenticate(token: string): Promise<User>;
}
