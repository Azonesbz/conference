"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeSeats = exports.organizeConference = void 0;
const conference_dto_1 = require("../dto/conference.dto");
const validate_request_1 = require("../utils/validate-request");
const organizeConference = (container) => {
    return async (req, res, next) => {
        try {
            const body = req.body;
            const { errors, input } = await (0, validate_request_1.ValidatorRequest)(conference_dto_1.CreateConferenceInputs, body);
            if (errors) {
                return res.jsonError(errors, 400);
            }
            const result = await container.resolve('organizeConference').execute({
                user: req.user,
                title: input.title,
                startDate: new Date(input.startDate),
                endDate: new Date(input.endDate),
                seats: input.seats
            });
            return res.jsonSuccess({ id: result.id }, 201);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.organizeConference = organizeConference;
const changeSeats = (container) => {
    return async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const { input, errors } = await (0, validate_request_1.ValidatorRequest)(conference_dto_1.ChangeSeatsInputs, body);
            if (errors) {
                return res.jsonError(errors, 400);
            }
            await container.resolve('changeSeats').execute({
                user: req.user,
                conferenceId: id,
                seats: input.seats
            });
            return res.jsonSuccess({ message: "The number of seats was changed correctly" }, 200);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.changeSeats = changeSeats;
//# sourceMappingURL=conference.controllers.js.map