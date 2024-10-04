import { Entity } from "../../core/entities/entity";
type ConferenceProps = {
    id: string;
    organizerId: string;
    title: string;
    startDate: Date;
    endDate: Date;
    seats: number;
};
export declare class Conference extends Entity<ConferenceProps> {
    isTooClose(now: Date): boolean;
    hasTooManySeats(): boolean;
    hasNotEnoughSeats(): boolean;
    isTooLong(): boolean;
}
export {};
