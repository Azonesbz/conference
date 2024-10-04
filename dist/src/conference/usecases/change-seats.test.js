"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_seeds_1 = require("../../user/tests/user-seeds");
const in_memory_conference_repository_1 = require("../adapters/in-memory-conference-repository");
const conference_seeds_1 = require("../tests/conference-seeds");
const change_seats_1 = require("./change-seats");
describe("Feature: Changing the number of seats", () => {
    async function expectSeatsUnchanged() {
        const fetchedConference = await repository.findById(conference_seeds_1.testConference.conference1.props.id);
        expect(fetchedConference?.props.seats).toEqual(50);
    }
    let repository;
    let useCase;
    beforeEach(async () => {
        repository = new in_memory_conference_repository_1.InMemoryConferenceRepository();
        await repository.create(conference_seeds_1.testConference.conference1);
        useCase = new change_seats_1.ChangeSeats(repository);
    });
    describe('Scenario: Happy path', () => {
        it('should change the number of seats', async () => {
            await useCase.execute({
                user: user_seeds_1.testUsers.johnDoe,
                conferenceId: conference_seeds_1.testConference.conference1.props.id,
                seats: 100
            });
            const fetchedConference = await repository.findById(conference_seeds_1.testConference.conference1.props.id);
            expect(fetchedConference.props.seats).toEqual(100);
        });
    });
    describe('Scenario: Conference does not exit', () => {
        it('should fail', async () => {
            await expect(useCase.execute({
                user: user_seeds_1.testUsers.johnDoe,
                conferenceId: 'non-existing-id',
                seats: 100
            })).rejects.toThrow('Conference not found');
            await expectSeatsUnchanged();
        });
    });
    describe('Scenario: Update the conference of someone else', () => {
        it('should fail', async () => {
            await expect(useCase.execute({
                user: user_seeds_1.testUsers.bob,
                conferenceId: conference_seeds_1.testConference.conference1.props.id,
                seats: 100
            })).rejects.toThrow('You are not allowed to update this conference');
            await expectSeatsUnchanged();
        });
    });
    describe('Scenario: Number of seats <= 1000', () => {
        it('should fail', async () => {
            await expect(useCase.execute({
                user: user_seeds_1.testUsers.johnDoe,
                conferenceId: conference_seeds_1.testConference.conference1.props.id,
                seats: 1001
            })).rejects.toThrow('The conference must have a maximum of 1000 seats and minimum of 20 seats');
            await expectSeatsUnchanged();
        });
    });
    describe('Scenario: Number of seats >= 20', () => {
        it('should fail', async () => {
            await expect(useCase.execute({
                user: user_seeds_1.testUsers.johnDoe,
                conferenceId: conference_seeds_1.testConference.conference1.props.id,
                seats: 15
            })).rejects.toThrow('The conference must have a maximum of 1000 seats and minimum of 20 seats');
            await expectSeatsUnchanged();
        });
    });
});
//# sourceMappingURL=change-seats.test.js.map