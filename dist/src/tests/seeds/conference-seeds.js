"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e2eConference = void 0;
const date_fns_1 = require("date-fns");
const conference_entity_1 = require("../../conference/entities/conference.entity");
const conference_fixture_1 = require("../fixtures/conference-fixture");
const user_seeds_1 = require("./user-seeds");
exports.e2eConference = {
    conference1: new conference_fixture_1.ConferenceFixture(new conference_entity_1.Conference({
        id: 'id-1',
        organizerId: user_seeds_1.e2eUsers.johnDoe.entity.props.id,
        title: "My first conference",
        seats: 50,
        startDate: (0, date_fns_1.addDays)(new Date(), 4),
        endDate: (0, date_fns_1.addDays)((0, date_fns_1.addHours)(new Date(), 2), 4)
    }))
};
//# sourceMappingURL=conference-seeds.js.map