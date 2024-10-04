import { AwilixContainer } from "awilix";
import { User } from "../../user/entities/user.entity";
import { IFixture } from "./fixture.interface";
export declare class UserFixture implements IFixture {
    entity: User;
    constructor(entity: User);
    load(container: AwilixContainer): Promise<void>;
    createAuthorizationToken(): string;
}
