"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const json_respsone_middleware_1 = require("./middlewares/json-respsone.middleware");
const conference_routes_1 = __importDefault(require("./routes/conference.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(json_respsone_middleware_1.jsonResponseMiddleware);
app.use(conference_routes_1.default);
app.use(error_handler_middleware_1.errorHandlerMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map