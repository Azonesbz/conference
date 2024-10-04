"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_memory_user_repository_1 = require("../adapters/in-memory-user-repository");
const user_entity_1 = require("../entities/user.entity");
const basic_authenticator_1 = require("./basic-authenticator");
describe('Authentication', () => {
    let repository;
    let authenticator;
    beforeEach(async () => {
        repository = new in_memory_user_repository_1.InMemoryUserRepository();
        await repository.create(new user_entity_1.User({
            id: 'john-doe',
            emailAddress: 'johndoe@gmail.com',
            password: 'qwerty'
        }));
        authenticator = new basic_authenticator_1.BasicAuthenticator(repository);
    });
    describe('Scenario: token is valid', () => {
        it('should return a user', async () => {
            const payload = Buffer.from('johndoe@gmail.com:qwerty').toString('base64');
            const user = await authenticator.authenticate(payload);
            expect(user.props).toEqual({
                id: 'john-doe',
                emailAddress: 'johndoe@gmail.com',
                password: 'qwerty'
            });
        });
    });
    describe('Scenario: email is not valid', () => {
        it('should throw an error', async () => {
            const payload = Buffer.from('unknown@gmail.com:qwerty').toString('base64');
            await expect(authenticator.authenticate(payload)).rejects.toThrow("Wrong credentials");
        });
    });
    describe('Scenario: password is not valid', () => {
        it('should throw an error', async () => {
            const payload = Buffer.from('johndoe@gmail.com:wrong-password').toString('base64');
            await expect(authenticator.authenticate(payload)).rejects.toThrow("Wrong credentials");
        });
    });
});
//# sourceMappingURL=basic-authenticator.test.js.map