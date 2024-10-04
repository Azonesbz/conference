"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dependency_injection_1 = __importDefault(require("../infrastructure/express_api/config/dependency-injection"));
const conference_seeds_1 = require("./seeds/conference-seeds");
const user_seeds_1 = require("./seeds/user-seeds");
const test_app_1 = require("./utils/test-app");
describe('Feature: Change the number of seats', () => {
    let testApp;
    let app;
    beforeEach(async () => {
        testApp = new test_app_1.TestApp();
        await testApp.setup();
        await testApp.loadAllFixtures([user_seeds_1.e2eUsers.johnDoe, conference_seeds_1.e2eConference.conference1]);
        app = testApp.expressApp;
    });
    afterAll(async () => {
        await testApp.tearDown();
    });
    describe('Scenario: Happy path', () => {
        it('should change the number of seats', async () => {
            const seats = 100;
            const id = 'id-1';
            const result = await (0, supertest_1.default)(app)
                .patch(`/conference/seats/${id}`)
                .set('Authorization', user_seeds_1.e2eUsers.johnDoe.createAuthorizationToken())
                .send({ seats });
            expect(result.status).toBe(200);
            const conferenceRepository = dependency_injection_1.default.resolve('conferenceRepository');
            const fetchedConference = await conferenceRepository.findById(id);
            expect(fetchedConference).toBeDefined();
            expect(fetchedConference?.props.seats).toEqual(seats);
        });
    });
    describe('Scenario: User is not authorized', () => {
        it('should return 403 Unauthorized', async () => {
            const seats = 100;
            const id = 'id-1';
            const result = await (0, supertest_1.default)(app)
                .patch(`/conference/seats/${id}`)
                .send({ seats });
            expect(result.status).toBe(403);
        });
    });
});
//# sourceMappingURL=change-seats.e2e.test.js.map