"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConferenceFixture = void 0;
class ConferenceFixture {
    constructor(entity) {
        this.entity = entity;
    }
    async load(container) {
        const repository = container.resolve('conferenceRepository');
        await repository.create(this.entity);
    }
}
exports.ConferenceFixture = ConferenceFixture;
//# sourceMappingURL=conference-fixture.js.map