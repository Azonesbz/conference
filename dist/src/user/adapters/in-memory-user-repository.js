"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    constructor() {
        this.users = [];
    }
    async create(user) {
        this.users.push(user);
    }
    async findByEmailAddress(emailAddress) {
        const user = this.users.find(user => user.props.emailAddress === emailAddress);
        return user ?? null;
    }
    async findById(id) {
        const user = this.users.find(user => user.props.id === id);
        return user ?? null;
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=in-memory-user-repository.js.map