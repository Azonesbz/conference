"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizeConference = void 0;
const conference_entity_1 = require("../entities/conference.entity");
class OrganizeConference {
    constructor(repository, idGenerator, dateGenerator) {
        this.repository = repository;
        this.idGenerator = idGenerator;
        this.dateGenerator = dateGenerator;
    }
    async execute({ user, title, startDate, endDate, seats }) {
        const id = this.idGenerator.generate();
        const newConference = new conference_entity_1.Conference({
            id,
            organizerId: user.props.id,
            title,
            startDate,
            endDate,
            seats
        });
        if (newConference.isTooClose(this.dateGenerator.now())) {
            throw new Error("The conference must happen in at least 3 days");
        }
        if (newConference.hasTooManySeats()) {
            throw new Error("The conference must have a maximum of 1000 seats");
        }
        if (newConference.hasNotEnoughSeats()) {
            throw new Error("The conference must have at least 20 seats");
        }
        if (newConference.isTooLong()) {
            throw new Error("The conference is too long (> 3 hours)");
        }
        await this.repository.create(newConference);
        return { id };
    }
}
exports.OrganizeConference = OrganizeConference;
//# sourceMappingURL=organize-conference.js.map