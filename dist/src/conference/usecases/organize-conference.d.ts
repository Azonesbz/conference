import { Executable } from "../../core/executable.interface";
import { IDateGenerator } from "../../core/ports/date-generator.interface";
import { IIDGenerator } from "../../core/ports/id-generator.interface";
import { User } from "../../user/entities/user.entity";
import { IConferenceRepository } from "../ports/conference-repository.interface";
type OrganizeRequest = {
    user: User;
    title: string;
    startDate: Date;
    endDate: Date;
    seats: number;
};
type OrganizeResponse = {
    id: string;
};
export declare class OrganizeConference implements Executable<OrganizeRequest, OrganizeResponse> {
    private readonly repository;
    private readonly idGenerator;
    private readonly dateGenerator;
    constructor(repository: IConferenceRepository, idGenerator: IIDGenerator, dateGenerator: IDateGenerator);
    execute({ user, title, startDate, endDate, seats }: {
        user: any;
        title: any;
        startDate: any;
        endDate: any;
        seats: any;
    }): Promise<{
        id: string;
    }>;
}
export {};
