"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeDates = void 0;
class ChangeDates {
    constructor(repository, dateGenerator, bookingRepository, mailer, userRepository) {
        this.repository = repository;
        this.dateGenerator = dateGenerator;
        this.bookingRepository = bookingRepository;
        this.mailer = mailer;
        this.userRepository = userRepository;
    }
    async execute({ user, conferenceId, startDate, endDate }) {
        const conference = await this.repository.findById(conferenceId);
        if (!conference)
            throw new Error("Conference not found");
        if (conference.props.organizerId !== user.props.id)
            throw new Error("You are not allowed to update this conference");
        conference.update({
            startDate,
            endDate
        });
        if (conference.isTooClose(this.dateGenerator.now())) {
            throw new Error("The conference must happen in at least 3 days");
        }
        if (conference.isTooLong()) {
            throw new Error("The conference is too long (> 3 hours)");
        }
        await this.repository.update(conference);
        await this.sendEmailToParticipants(conference);
    }
    async sendEmailToParticipants(conference) {
        const bookings = await this.bookingRepository.findByConferenceId(conference.props.id);
        const users = await Promise.all(bookings
            .map(booking => this.userRepository.findById(booking.props.userId))
            .filter(user => user !== null));
        await Promise.all(users.map(user => {
            this.mailer.send({
                from: 'TEDx conference',
                to: user.props.emailAddress,
                subject: `The dates of the conference: ${conference.props.title}, have changed`,
                body: `The dates of the conference: ${conference.props.title}, have changed`
            });
        }));
    }
}
exports.ChangeDates = ChangeDates;
//# sourceMappingURL=change-dates.js.map