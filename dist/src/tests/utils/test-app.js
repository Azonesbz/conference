"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApp = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dependency_injection_1 = __importDefault(require("../../infrastructure/express_api/config/dependency-injection"));
const error_handler_middleware_1 = require("../../infrastructure/express_api/middlewares/error-handler.middleware");
const json_respsone_middleware_1 = require("../../infrastructure/express_api/middlewares/json-respsone.middleware");
const conference_routes_1 = __importDefault(require("../../infrastructure/express_api/routes/conference.routes"));
class TestApp {
    constructor() {
        this.app = (0, express_1.default)();
        this.container = dependency_injection_1.default;
    }
    async setup() {
        await mongoose_1.default.connect('mongodb://admin:qwerty@localhost:3702/conferences?authSource=admin');
        await mongoose_1.default.connection.db?.collection('users').deleteMany({});
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(json_respsone_middleware_1.jsonResponseMiddleware);
        this.app.use(conference_routes_1.default);
        this.app.use(error_handler_middleware_1.errorHandlerMiddleware);
    }
    async loadAllFixtures(fixtures) {
        return Promise.all(fixtures.map(fixture => fixture.load(this.container)));
    }
    async tearDown() {
        await mongoose_1.default.connection.close();
    }
    get expressApp() {
        return this.app;
    }
}
exports.TestApp = TestApp;
//# sourceMappingURL=test-app.js.map