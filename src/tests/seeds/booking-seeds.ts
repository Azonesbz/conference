import { addDays, addHours } from "date-fns";
import { Conference } from "../../conference/entities/conference.entity";
import { ConferenceFixture } from "../fixtures/conference-fixture";
import { e2eUsers } from "./user-seeds";
import { BookingFixture } from "../fixtures/booking-fixture";
import { Booking } from "../../conference/entities/booking.entity";
import { e2eConference } from "./conference-seeds";


export const e2eBooking = {
    bobBooking: new BookingFixture(
        new Booking({
            userId: e2eUsers.johnDoe.entity.props.id,
            conferenceId: e2eConference.conference1.entity.props.id,
        })
    )
}