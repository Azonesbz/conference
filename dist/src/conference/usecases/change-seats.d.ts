import { Executable } from "../../core/executable.interface";
import { User } from "../../user/entities/user.entity";
import { IConferenceRepository } from "../ports/conference-repository.interface";
type RequestChangeSeats = {
    user: User;
    conferenceId: string;
    seats: number;
};
type ResponseChangeSeats = void;
export declare class ChangeSeats implements Executable<RequestChangeSeats, ResponseChangeSeats> {
    private readonly repository;
    constructor(repository: IConferenceRepository);
    execute({ user, conferenceId, seats }: {
        user: any;
        conferenceId: any;
        seats: any;
    }): Promise<void>;
}
export {};
