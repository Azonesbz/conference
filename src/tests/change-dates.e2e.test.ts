import { Application } from "express";
import request from "supertest";
import { IConferenceRepository } from "../conference/ports/conference-repository.interface";
import container from "../infrastructure/express_api/config/dependency-injection";
import { e2eConference } from "./seeds/conference-seeds";
import { e2eUsers } from "./seeds/user-seeds";
import { TestApp } from "./utils/test-app";
import { addDays } from "date-fns";
import { e2eBooking } from "./seeds/booking-seeds";

describe("Feature: Change the number of seats", () => {
  let testApp: TestApp;
  let app: Application;

  beforeEach(async () => {
    testApp = new TestApp();
    await testApp.setup();
    await testApp.loadAllFixtures([
      e2eUsers.johnDoe,
      e2eConference.conference1,
      e2eBooking.bobBooking,
    ]);
    app = testApp.expressApp;
  });

  afterAll(async () => {
    await testApp.tearDown();
  });

  describe("Scenario: Happy path", () => {
    it("should change the date", async () => {
      const startDate = addDays(new Date(), 8);
      const endDate = addDays((new Date(), 2), 10);
      const id = "id-1";

      const result = await request(app)
        .patch(`/conference/dates/${id}`)
        .set("Authorization", e2eUsers.johnDoe.createAuthorizationToken())
        .send({ startDate, endDate });

      expect(result.status).toBe(200);

      const conferenceRepository = container.resolve(
        "conferenceRepository"
      ) as IConferenceRepository;
      const fetchedConference = await conferenceRepository.findById(id);

      expect(fetchedConference).toBeDefined();
      expect(fetchedConference?.props.startDate).toEqual(startDate);
      expect(fetchedConference?.props.startDate).toEqual(endDate);
    });
  });
});
