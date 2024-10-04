"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFixture = void 0;
class UserFixture {
    constructor(entity) {
        this.entity = entity;
    }
    async load(container) {
        const repository = container.resolve('userRepository');
        await repository.create(this.entity);
    }
    createAuthorizationToken() {
        return 'Basic ' + Buffer
            .from(`${this.entity.props.emailAddress}:${this.entity.props.password}`)
            .toString('base64');
    }
}
exports.UserFixture = UserFixture;
//# sourceMappingURL=user-fixture.js.map