"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testBooking = void 0;
const user_seeds_1 = require("../../user/tests/user-seeds");
const booking_entity_1 = require("../entities/booking.entity");
const conference_seeds_1 = require("./conference-seeds");
exports.testBooking = {
    bobBooking: new booking_entity_1.Booking({
        userId: user_seeds_1.testUsers.bob.props.id,
        conferenceId: conference_seeds_1.testConference.conference1.props.id
    }),
    aliceBooking: new booking_entity_1.Booking({
        userId: user_seeds_1.testUsers.alice.props.id,
        conferenceId: conference_seeds_1.testConference.conference1.props.id
    })
};
//# sourceMappingURL=booking-seeds.js.map