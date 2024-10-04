import { Executable } from "../../core/executable.interface";
import { IDateGenerator } from "../../core/ports/date-generator.interface";
import { IMailer } from "../../core/ports/mailer.interface";
import { User } from "../../user/entities/user.entity";
import { IUserRepository } from "../../user/ports/user-repository.interface";
import { Conference } from "../entities/conference.entity";
import { IBookingRepository } from "../ports/booking-repository.interface";
import { IConferenceRepository } from "../ports/conference-repository.interface";
type RequestChangeDates = {
    user: User;
    conferenceId: string;
    startDate: Date;
    endDate: Date;
};
type ResponseChangeDates = void;
export declare class ChangeDates implements Executable<RequestChangeDates, ResponseChangeDates> {
    private readonly repository;
    private readonly dateGenerator;
    private readonly bookingRepository;
    private readonly mailer;
    private readonly userRepository;
    constructor(repository: IConferenceRepository, dateGenerator: IDateGenerator, bookingRepository: IBookingRepository, mailer: IMailer, userRepository: IUserRepository);
    execute({ user, conferenceId, startDate, endDate }: RequestChangeDates): Promise<void>;
    sendEmailToParticipants(conference: Conference): Promise<void>;
}
export {};
