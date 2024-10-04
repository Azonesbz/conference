"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const fixed_date_generator_1 = require("../../core/adapters/fixed-date-generator");
const in_memory_mailer_1 = require("../../core/adapters/in-memory-mailer");
const in_memory_user_repository_1 = require("../../user/adapters/in-memory-user-repository");
const user_seeds_1 = require("../../user/tests/user-seeds");
const in_memory_booking_repository_1 = require("../adapters/in-memory-booking-repository");
const in_memory_conference_repository_1 = require("../adapters/in-memory-conference-repository");
const conference_seeds_1 = require("../tests/conference-seeds");
const change_dates_1 = require("./change-dates");
const booking_seeds_1 = require("../tests/booking-seeds");
describe('Feature: change the dates of conference', () => {
    async function expectDatesRemainUnchanged() {
        const conference = await repository.findById(conference_seeds_1.testConference.conference1.props.id);
        expect(conference?.props.startDate).toEqual(conference_seeds_1.testConference.conference1.props.startDate);
        expect(conference?.props.endDate).toEqual(conference_seeds_1.testConference.conference1.props.endDate);
    }
    let useCase;
    let repository;
    let dateGenerator;
    let bookingRepository;
    let mailer;
    let userRepository;
    beforeEach(async () => {
        repository = new in_memory_conference_repository_1.InMemoryConferenceRepository();
        await repository.create(conference_seeds_1.testConference.conference1);
        dateGenerator = new fixed_date_generator_1.FixedDateGenerator();
        bookingRepository = new in_memory_booking_repository_1.InMemoryBookingRepository();
        await bookingRepository.create(booking_seeds_1.testBooking.bobBooking);
        await bookingRepository.create(booking_seeds_1.testBooking.aliceBooking);
        mailer = new in_memory_mailer_1.InMemoryMailer();
        userRepository = new in_memory_user_repository_1.InMemoryUserRepository();
        await userRepository.create(user_seeds_1.testUsers.bob);
        await userRepository.create(user_seeds_1.testUsers.alice);
        useCase = new change_dates_1.ChangeDates(repository, dateGenerator, bookingRepository, mailer, userRepository);
    });
    describe('Scenario: Happy path', () => {
        const startDate = (0, date_fns_1.addDays)(new Date(), 8);
        const endDate = (0, date_fns_1.addDays)((0, date_fns_1.addHours)(new Date(), 2), 8);
        const payload = {
            user: user_seeds_1.testUsers.johnDoe,
            conferenceId: conference_seeds_1.testConference.conference1.props.id,
            startDate,
            endDate
        };
        it('should change the dates', async () => {
            await useCase.execute(payload);
            const fetchedConference = await repository.findById(conference_seeds_1.testConference.conference1.props.id);
            expect(fetchedConference?.props.startDate).toEqual(startDate);
            expect(fetchedConference?.props.endDate).toEqual(endDate);
        });
        it('should send an email to the participants', async () => {
            await useCase.execute(payload);
            expect(mailer.sentEmails).toEqual([{
                    from: 'TEDx conference',
                    to: user_seeds_1.testUsers.bob.props.emailAddress,
                    subject: `The dates of the conference: ${conference_seeds_1.testConference.conference1.props.title}, have changed`,
                    body: `The dates of the conference: ${conference_seeds_1.testConference.conference1.props.title}, have changed`
                }, {
                    from: 'TEDx conference',
                    to: user_seeds_1.testUsers.alice.props.emailAddress,
                    subject: `The dates of the conference: ${conference_seeds_1.testConference.conference1.props.title}, have changed`,
                    body: `The dates of the conference: ${conference_seeds_1.testConference.conference1.props.title}, have changed`
                }]);
        });
    });
    describe('Scenario: Conference does not exist', () => {
        const startDate = (0, date_fns_1.addDays)(new Date(), 8);
        const endDate = (0, date_fns_1.addDays)((0, date_fns_1.addHours)(new Date(), 2), 8);
        const payload = {
            user: user_seeds_1.testUsers.johnDoe,
            conferenceId: 'non-existing-id',
            startDate,
            endDate
        };
        it('should fail', async () => {
            await expect(useCase.execute(payload))
                .rejects
                .toThrow("Conference not found");
            await expectDatesRemainUnchanged();
        });
    });
    describe('Scenario: Update conference of someone else', () => {
        const startDate = (0, date_fns_1.addDays)(new Date(), 8);
        const endDate = (0, date_fns_1.addDays)((0, date_fns_1.addHours)(new Date(), 2), 8);
        const payload = {
            user: user_seeds_1.testUsers.bob,
            conferenceId: conference_seeds_1.testConference.conference1.props.id,
            startDate,
            endDate
        };
        it('should fail', async () => {
            await expect(useCase.execute(payload))
                .rejects
                .toThrow("You are not allowed to update this conference");
            await expectDatesRemainUnchanged();
        });
    });
    describe('Scenario: The new start date is too close', () => {
        const startDate = new Date('2024-01-02T00:00:00.000Z');
        const endDate = new Date('2024-01-02T02:00:00.000Z');
        const payload = {
            user: user_seeds_1.testUsers.johnDoe,
            conferenceId: conference_seeds_1.testConference.conference1.props.id,
            startDate,
            endDate
        };
        it('should fail', async () => {
            await expect(useCase.execute(payload))
                .rejects
                .toThrow("The conference must happen in at least 3 days");
            await expectDatesRemainUnchanged();
        });
    });
    describe('Scenario: The updated conference is too long', () => {
        const startDate = new Date('2024-01-04T00:00:00.000Z');
        const endDate = new Date('2024-01-04T05:00:00.000Z');
        const payload = {
            user: user_seeds_1.testUsers.johnDoe,
            conferenceId: conference_seeds_1.testConference.conference1.props.id,
            startDate,
            endDate
        };
        it('should fail', async () => {
            await expect(useCase.execute(payload))
                .rejects
                .toThrow("The conference is too long (> 3 hours)");
            await expectDatesRemainUnchanged();
        });
    });
});
//# sourceMappingURL=change-dates.test.js.map