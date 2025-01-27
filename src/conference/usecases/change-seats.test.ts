import { testUsers } from "../../user/tests/user-seeds";
import { InMemoryBookingRepository } from "../adapters/in-memory-booking-repository";
import { InMemoryConferenceRepository } from "../adapters/in-memory-conference-repository";
import { testBooking } from "../tests/booking-seeds";
import { testConference } from "../tests/conference-seeds";
import { ChangeSeats } from "./change-seats";

describe("Feature: Changing the number of seats", () => {
  async function expectSeatsUnchanged() {
    const fetchedConference = await repository.findById(
      testConference.conference1.props.id
    );
    expect(fetchedConference?.props.seats).toEqual(50);
  }

  let repository: InMemoryConferenceRepository;
  let useCase: ChangeSeats;
  let bookingRepository: InMemoryBookingRepository;

  beforeEach(async () => {
    repository = new InMemoryConferenceRepository();
    bookingRepository = new InMemoryBookingRepository();

    await repository.create(testConference.conference1);
    await repository.create(testConference.conference2);
    for (let i = bookingRepository.database.length; i < 30; i++) {
      await bookingRepository.create(testBooking.vincentBooking);
    }

    useCase = new ChangeSeats(repository, bookingRepository);
  });

  describe("Scenario: Happy path", () => {
    it("should change the number of seats", async () => {
      await useCase.execute({
        user: testUsers.johnDoe,
        conferenceId: testConference.conference1.props.id,
        seats: 100,
      });

      const fetchedConference = await repository.findById(
        testConference.conference1.props.id
      );
      expect(fetchedConference!.props.seats).toEqual(100);
    });
  });

  describe("Scenario: Conference does not exit", () => {
    it("should fail", async () => {
      await expect(
        useCase.execute({
          user: testUsers.johnDoe,
          conferenceId: "non-existing-id",
          seats: 100,
        })
      ).rejects.toThrow("Conference not found");

      await expectSeatsUnchanged();
    });
  });

  describe("Scenario: Update the conference of someone else", () => {
    it("should fail", async () => {
      await expect(
        useCase.execute({
          user: testUsers.bob,
          conferenceId: testConference.conference1.props.id,
          seats: 100,
        })
      ).rejects.toThrow("You are not allowed to update this conference");

      await expectSeatsUnchanged();
    });
  });

  describe("Scenario: Number of seats <= 1000", () => {
    it("should fail", async () => {
      await expect(
        useCase.execute({
          user: testUsers.johnDoe,
          conferenceId: testConference.conference1.props.id,
          seats: 1001,
        })
      ).rejects.toThrow(
        "The conference must have a maximum of 1000 seats and minimum of 20 seats"
      );

      await expectSeatsUnchanged();
    });
  });

  describe("Scenario: Number of seats >= 20", () => {
    it("should fail", async () => {
      await expect(
        useCase.execute({
          user: testUsers.johnDoe,
          conferenceId: testConference.conference1.props.id,
          seats: 15,
        })
      ).rejects.toThrow(
        "The conference must have a maximum of 1000 seats and minimum of 20 seats"
      );

      await expectSeatsUnchanged();
    });
  });

  // evaluation
  describe("Scenario: Trying to update number of seats lower than booking", () => {
    it("should failed", async () => {
      const result = useCase.execute({
        user: testUsers.vincent,
        conferenceId: testConference.conference2.props.id,
        seats: 29,
      });
      await expect(result).rejects.toThrow(
        "You cannot reduce the number of seats lower than booking"
      );
    });
  });

  describe("Add new booking", () => {
    it("should failed if number of booking is higher than seat", async () => {
      await expect(
        useCase.addBooking({ booking: testBooking.johnBooking })
      ).rejects.toThrow(
        "You can't book this conference because all the places are took"
      );
    });

    it("should add new booking to conference", async () => {
      const conferenceId = testBooking.aliceBooking.props.conferenceId;
      const numberOfBookingBefore = await bookingRepository.findByConferenceId(
        conferenceId
      );

      await useCase.addBooking({ booking: testBooking.aliceBooking });
      const numberOfBookingAfter = await bookingRepository.findByConferenceId(
        conferenceId
      );

      expect(numberOfBookingAfter.length).toBeGreaterThan(
        numberOfBookingBefore.length
      );
    });
  });
});
