"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const extract_token_1 = require("../utils/extract-token");
const dependency_injection_1 = __importDefault(require("../config/dependency-injection"));
const isAuthenticated = async (req, res, next) => {
    try {
        const credentials = req.headers.authorization;
        if (!credentials)
            return res.jsonError('Unauthorized', 403);
        const token = (0, extract_token_1.extractToken)(credentials);
        if (!token)
            return res.jsonError('Unauthorized', 403);
        const user = await dependency_injection_1.default.resolve('authenticator').authenticate(token);
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authentication.middleware.js.map