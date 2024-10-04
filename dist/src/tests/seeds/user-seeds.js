"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e2eUsers = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
const user_fixture_1 = require("../fixtures/user-fixture");
exports.e2eUsers = {
    johnDoe: new user_fixture_1.UserFixture(new user_entity_1.User({
        id: 'john-doe',
        emailAddress: 'johndoe@gmail.com',
        password: 'qwerty'
    }))
};
//# sourceMappingURL=user-seeds.js.map