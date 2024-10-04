"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_app_1 = require("../../../tests/utils/test-app");
const user_seeds_1 = require("../../tests/user-seeds");
const mongo_user_1 = require("./mongo-user");
const mongo_user_repository_1 = require("./mongo-user-repository");
describe('MongoUserRepository', () => {
    let app;
    let model;
    let repository;
    beforeEach(async () => {
        app = new test_app_1.TestApp();
        await app.setup();
        model = mongo_user_1.MongoUser.UserModel;
        await model.deleteMany({});
        repository = new mongo_user_repository_1.MongoUserRepository(model);
        const record = new model({
            _id: user_seeds_1.testUsers.johnDoe.props.id,
            emailAddress: user_seeds_1.testUsers.johnDoe.props.emailAddress,
            password: user_seeds_1.testUsers.johnDoe.props.password
        });
        await record.save();
    });
    afterEach(async () => {
        await app.tearDown();
    });
    describe('Scenario: findByEmailAddress', () => {
        it('should find user corresponding to the email address', async () => {
            const user = await repository.findByEmailAddress(user_seeds_1.testUsers.johnDoe.props.emailAddress);
            expect(user?.props).toEqual(user_seeds_1.testUsers.johnDoe.props);
        });
        it('should return null if user not found', async () => {
            const user = await repository.findByEmailAddress('non-existing@gmail.com');
            expect(user).toBeNull();
        });
    });
    describe('Scenario: Create a user', () => {
        it('should create a user', async () => {
            await repository.create(user_seeds_1.testUsers.bob);
            const fetchedUser = await model.findOne({ _id: user_seeds_1.testUsers.bob.props.id });
            expect(fetchedUser?.toObject()).toEqual({
                _id: user_seeds_1.testUsers.bob.props.id,
                emailAddress: user_seeds_1.testUsers.bob.props.emailAddress,
                password: user_seeds_1.testUsers.bob.props.password,
                __v: 0
            });
        });
    });
    describe('Scenario: Find by id', () => {
        it('should fin the user corresponding to the id', async () => {
            const user = await repository.findById(user_seeds_1.testUsers.johnDoe.props.id);
            expect(user?.props).toEqual(user_seeds_1.testUsers.johnDoe.props);
        });
        it('should return null if no user found', async () => {
            const user = await repository.findById('non-existing-id');
            expect(user).toBeNull();
        });
    });
});
//# sourceMappingURL=mongo-user-repository.int.test.js.map