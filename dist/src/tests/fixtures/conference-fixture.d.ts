import { AwilixContainer } from "awilix";
import { Conference } from "../../conference/entities/conference.entity";
import { IFixture } from "./fixture.interface";
export declare class ConferenceFixture implements IFixture {
    entity: Conference;
    constructor(entity: Conference);
    load(container: AwilixContainer): Promise<void>;
}
