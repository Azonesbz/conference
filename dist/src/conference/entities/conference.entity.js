"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conference = void 0;
const date_fns_1 = require("date-fns");
const entity_1 = require("../../core/entities/entity");
class Conference extends entity_1.Entity {
    isTooClose(now) {
        return (0, date_fns_1.differenceInDays)(this.props.startDate, now) < 3;
    }
    hasTooManySeats() {
        return this.props.seats > 1000;
    }
    hasNotEnoughSeats() {
        return this.props.seats < 20;
    }
    isTooLong() {
        return (0, date_fns_1.differenceInHours)(this.props.endDate, this.props.startDate) > 3;
    }
}
exports.Conference = Conference;
//# sourceMappingURL=conference.entity.js.map