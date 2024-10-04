"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorRequest = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validationError = async (input) => {
    const errors = await (0, class_validator_1.validate)(input, { validationError: { target: true } });
    if (errors.length)
        return errors;
    return false;
};
const ValidatorRequest = async (type, body) => {
    const input = (0, class_transformer_1.plainToClass)(type, body);
    const errors = await validationError(input);
    if (errors) {
        const errorMessage = errors.map((error) => Object.values(error.constraints)).join(', ');
        return { errors: errorMessage, input };
    }
    return { errors: false, input };
};
exports.ValidatorRequest = ValidatorRequest;
//# sourceMappingURL=validate-request.js.map