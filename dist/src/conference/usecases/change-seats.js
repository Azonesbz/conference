"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeSeats = void 0;
class ChangeSeats {
    constructor(repository) {
        this.repository = repository;
    }
    async execute({ user, conferenceId, seats }) {
        const conference = await this.repository.findById(conferenceId);
        if (!conference)
            throw new Error("Conference not found");
        if (conference.props.organizerId !== user.props.id)
            throw new Error("You are not allowed to update this conference");
        conference.update({ seats });
        if (conference.hasNotEnoughSeats() || conference.hasTooManySeats()) {
            throw new Error("The conference must have a maximum of 1000 seats and minimum of 20 seats");
        }
        await this.repository.update(conference);
    }
}
exports.ChangeSeats = ChangeSeats;
//# sourceMappingURL=change-seats.js.map