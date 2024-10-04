"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonResponseMiddleware = void 0;
function jsonResponseMiddleware(req, res, next) {
    res.jsonSuccess = (data, statusCode) => {
        const response = {
            success: true,
            data
        };
        res.status(statusCode).json(response);
    };
    res.jsonError = (error, statusCode) => {
        const response = {
            success: false,
            data: null,
            error: {
                message: error,
                code: statusCode
            }
        };
        res.status(statusCode).json(response);
    };
    next();
}
exports.jsonResponseMiddleware = jsonResponseMiddleware;
//# sourceMappingURL=json-respsone.middleware.js.map