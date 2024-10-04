import { testUsers } from "../../user/tests/user-seeds";
import { Booking } from "../entities/booking.entity";
import { testConference } from "./conference-seeds";


export const testBooking = {
    bobBooking: new Booking({
        userId: testUsers.bob.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    aliceBooking : new Booking({
        userId: testUsers.alice.props.id,
        conferenceId: testConference.conference1.props.id
    }),
    johnBooking : new Booking({
        userId: testUsers.john.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    vincentBooking : new Booking({
        userId: testUsers.vincent.props.id,
        conferenceId: testConference.conference2.props.id
    }),
    alexBooking : new Booking({
        userId: testUsers.alex.props.id,
        conferenceId: testConference.conference2.props.id
    })
}