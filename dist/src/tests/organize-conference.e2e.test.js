"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const supertest_1 = __importDefault(require("supertest"));
const dependency_injection_1 = __importDefault(require("../infrastructure/express_api/config/dependency-injection"));
const user_seeds_1 = require("./seeds/user-seeds");
const test_app_1 = require("./utils/test-app");
describe('Feature: Organize Conference', () => {
    let testApp;
    let app;
    beforeEach(async () => {
        testApp = new test_app_1.TestApp();
        await testApp.setup();
        await testApp.loadAllFixtures([user_seeds_1.e2eUsers.johnDoe]);
        app = testApp.expressApp;
    });
    afterAll(async () => {
        await testApp.tearDown();
    });
    it('should organize a conference', async () => {
        const startDate = (0, date_fns_1.addDays)(new Date(), 4);
        const endDate = (0, date_fns_1.addDays)((0, date_fns_1.addHours)(new Date(), 2), 4);
        const result = await (0, supertest_1.default)(app)
            .post('/conference')
            .set('Authorization', user_seeds_1.e2eUsers.johnDoe.createAuthorizationToken())
            .send({
            title: 'My first conference',
            seats: 100,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        });
        expect(result.status).toBe(201);
        expect(result.body.data).toEqual({ id: expect.any(String) });
        const conferenceRepository = dependency_injection_1.default.resolve('conferenceRepository');
        const fetchedConference = await conferenceRepository.findById(result.body.data.id);
        expect(fetchedConference).toBeDefined();
        expect(fetchedConference?.props).toEqual({
            id: result.body.data.id,
            organizerId: user_seeds_1.e2eUsers.johnDoe.entity.props.id,
            title: 'My first conference',
            seats: 100,
            startDate,
            endDate,
        });
    });
});
//# sourceMappingURL=organize-conference.e2e.test.js.map