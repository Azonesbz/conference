"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUsers = void 0;
const user_entity_1 = require("../entities/user.entity");
exports.testUsers = {
    johnDoe: new user_entity_1.User({
        id: 'john-doe',
        emailAddress: 'johndoe@gmail.com',
        password: 'qwerty'
    }),
    bob: new user_entity_1.User({
        id: 'bob',
        emailAddress: 'bob@gmail.com',
        password: 'qwerty'
    }),
    alice: new user_entity_1.User({
        id: 'alice',
        emailAddress: 'alice@gmail.com',
        password: 'qwerty'
    })
};
//# sourceMappingURL=user-seeds.js.map