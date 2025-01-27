"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fixed_date_generator_1 = require("../../core/adapters/fixed-date-generator");
const fixed_id_generator_1 = require("../../core/adapters/fixed-id-generator");
const user_entity_1 = require("../../user/entities/user.entity");
const in_memory_conference_repository_1 = require("../adapters/in-memory-conference-repository");
const organize_conference_1 = require("./organize-conference");
describe("Feature: Organize conference", () => {
    function expectConferenceToEqual(conference) {
        expect(conference.props).toEqual({
            id: 'id-1',
            organizerId: 'john-doe',
            title: "My first conference",
            seats: 100,
            startDate: new Date('2024-09-01T10:00:00.000Z'),
            endDate: new Date('2024-09-01T11:00:00.000Z')
        });
    }
    const johnDoe = new user_entity_1.User({
        id: 'john-doe',
        emailAddress: 'johndoe@gmail.com',
        password: 'qwerty'
    });
    let repository;
    let idGenerator;
    let dateGenerator;
    let useCase;
    beforeEach(() => {
        repository = new in_memory_conference_repository_1.InMemoryConferenceRepository();
        idGenerator = new fixed_id_generator_1.FixedIDGenerator();
        dateGenerator = new fixed_date_generator_1.FixedDateGenerator();
        useCase = new organize_conference_1.OrganizeConference(repository, idGenerator, dateGenerator);
    });
    describe('Scenario: Happy path', () => {
        const payload = {
            user: johnDoe,
            title: "My first conference",
            seats: 100,
            startDate: new Date('2024-09-01T10:00:00.000Z'),
            endDate: new Date('2024-09-01T11:00:00.000Z')
        };
        it('should return the ID', async () => {
            const result = await useCase.execute(payload);
            expect(result.id).toEqual('id-1');
        });
        it('should insert the conference into the database', async () => {
            await useCase.execute(payload);
            const createdConference = repository.database[0];
            expect(repository.database.length).toBe(1);
            expectConferenceToEqual(createdConference);
        });
    });
    describe('Scenario: the conference happens too soon', () => {
        const payload = {
            user: johnDoe,
            title: "My first conference",
            seats: 100,
            startDate: new Date('2024-01-02T10:00:00.000Z'),
            endDate: new Date('2024-01-02T11:00:00.000Z')
        };
        it('should throw an error', async () => {
            await expect(() => useCase.execute(payload))
                .rejects
                .toThrow("The conference must happen in at least 3 days");
        });
        it('should not create a conference', async () => {
            try {
                await expect(() => useCase.execute(payload)).rejects.toThrow();
            }
            catch (error) { }
            expect(repository.database.length).toBe(0);
        });
    });
    describe('Scenario: the conference has too many seats', () => {
        const payload = {
            user: johnDoe,
            title: "My first conference",
            seats: 1001,
            startDate: new Date('2024-01-10T10:00:00.000Z'),
            endDate: new Date('2024-01-10T11:00:00.000Z')
        };
        it('should throw an error', async () => {
            await expect(() => useCase.execute(payload))
                .rejects
                .toThrow("The conference must have a maximum of 1000 seats");
        });
        it('should not create a conference', async () => {
            try {
                await expect(() => useCase.execute(payload)).rejects.toThrow();
            }
            catch (error) { }
            expect(repository.database.length).toBe(0);
        });
    });
    describe('Scenario: the conference don\'t have enough seats', () => {
        const payload = {
            user: johnDoe,
            title: "My first conference",
            seats: 15,
            startDate: new Date('2024-01-10T10:00:00.000Z'),
            endDate: new Date('2024-01-10T11:00:00.000Z')
        };
        it('should throw an error', async () => {
            await expect(() => useCase.execute(payload))
                .rejects
                .toThrow("The conference must have at least 20 seats");
        });
        it('should not create a conference', async () => {
            try {
                await expect(() => useCase.execute(payload)).rejects.toThrow();
            }
            catch (error) { }
            expect(repository.database.length).toBe(0);
        });
    });
    describe('Scenario: the conference is too long', () => {
        const payload = {
            user: johnDoe,
            title: "My first conference",
            seats: 50,
            startDate: new Date('2024-01-10T10:00:00.000Z'),
            endDate: new Date('2024-01-10T14:00:00.000Z')
        };
        it('should throw an error', async () => {
            await expect(() => useCase.execute(payload))
                .rejects
                .toThrow("The conference is too long (> 3 hours)");
        });
        it('should not create a conference', async () => {
            try {
                await expect(() => useCase.execute(payload)).rejects.toThrow();
            }
            catch (error) { }
            expect(repository.database.length).toBe(0);
        });
    });
});
//# sourceMappingURL=organize-conference.test.js.map