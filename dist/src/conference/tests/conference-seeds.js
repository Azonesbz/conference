"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConference = void 0;
const date_fns_1 = require("date-fns");
const user_seeds_1 = require("../../user/tests/user-seeds");
const conference_entity_1 = require("../entities/conference.entity");
exports.testConference = {
    conference1: new conference_entity_1.Conference({
        id: 'id-1',
        organizerId: user_seeds_1.testUsers.johnDoe.props.id,
        title: "My first conference",
        seats: 50,
        startDate: (0, date_fns_1.addDays)(new Date(), 4),
        endDate: (0, date_fns_1.addDays)((0, date_fns_1.addHours)(new Date(), 2), 4)
    })
};
//# sourceMappingURL=conference-seeds.js.map