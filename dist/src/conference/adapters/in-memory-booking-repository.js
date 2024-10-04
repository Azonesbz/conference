"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryBookingRepository = void 0;
class InMemoryBookingRepository {
    constructor() {
        this.database = [];
    }
    async create(booking) {
        this.database.push(booking);
    }
    async findByConferenceId(id) {
        return this.database.filter(booking => booking.props.conferenceId === id);
    }
}
exports.InMemoryBookingRepository = InMemoryBookingRepository;
//# sourceMappingURL=in-memory-booking-repository.js.map