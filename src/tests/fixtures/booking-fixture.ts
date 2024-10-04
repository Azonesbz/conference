import { AwilixContainer } from "awilix";
import { Conference } from "../../conference/entities/conference.entity";
import { IFixture } from "./fixture.interface";
import { Booking } from "../../conference/entities/booking.entity";


export class BookingFixture implements IFixture {
    constructor(public entity: Booking) {}

    async load(container: AwilixContainer): Promise<void> {
        const repository = container.resolve('bookingRepository')
        await repository.create(this.entity)
    }
}