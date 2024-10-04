"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const in_memory_conference_repository_1 = require("../../../conference/adapters/in-memory-conference-repository");
const change_seats_1 = require("../../../conference/usecases/change-seats");
const organize_conference_1 = require("../../../conference/usecases/organize-conference");
const current_date_generator_1 = require("../../../core/adapters/current-date-generator");
const random_id_generator_1 = require("../../../core/adapters/random-id-generator");
const mongo_user_1 = require("../../../user/adapters/mongo/mongo-user");
const mongo_user_repository_1 = require("../../../user/adapters/mongo/mongo-user-repository");
const basic_authenticator_1 = require("../../../user/services/basic-authenticator");
const container = (0, awilix_1.createContainer)();
container.register({
    conferenceRepository: (0, awilix_1.asClass)(in_memory_conference_repository_1.InMemoryConferenceRepository).singleton(),
    idGenerator: (0, awilix_1.asClass)(random_id_generator_1.RandomIDGenerator).singleton(),
    dateGenerator: (0, awilix_1.asClass)(current_date_generator_1.CurrentDateGenerator).singleton(),
    userRepository: (0, awilix_1.asValue)(new mongo_user_repository_1.MongoUserRepository(mongo_user_1.MongoUser.UserModel))
});
const conferenceRepository = container.resolve('conferenceRepository');
const idGenerator = container.resolve('idGenerator');
const dateGenerator = container.resolve('dateGenerator');
const userRepository = container.resolve('userRepository');
container.register({
    organizeConference: (0, awilix_1.asValue)(new organize_conference_1.OrganizeConference(conferenceRepository, idGenerator, dateGenerator)),
    changeSeats: (0, awilix_1.asValue)(new change_seats_1.ChangeSeats(conferenceRepository)),
    authenticator: (0, awilix_1.asValue)(new basic_authenticator_1.BasicAuthenticator(userRepository)),
});
exports.default = container;
//# sourceMappingURL=dependency-injection.js.map