"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
function errorHandlerMiddleware(error, req, res, next) {
    const formattedError = {
        message: error.message || "An error occurs",
        code: error.statusCode || 500
    };
    res.status(formattedError.code).json({
        success: false,
        data: null,
        error: formattedError
    });
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=error-handler.middleware.js.map