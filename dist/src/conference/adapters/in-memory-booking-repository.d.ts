import { Booking } from "../entities/booking.entity";
import { IBookingRepository } from "../ports/booking-repository.interface";
export declare class InMemoryBookingRepository implements IBookingRepository {
    database: Booking[];
    create(booking: Booking): Promise<void>;
    findByConferenceId(id: string): Promise<Booking[]>;
}
