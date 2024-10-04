"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryConferenceRepository = void 0;
const conference_entity_1 = require("../entities/conference.entity");
class InMemoryConferenceRepository {
    constructor() {
        this.database = [];
    }
    async create(conference) {
        this.database.push(conference);
    }
    async findById(id) {
        const conference = this.database.find(conf => conf.props.id === id);
        return conference ? new conference_entity_1.Conference({ ...conference.initialState }) : null;
    }
    async update(conference) {
        const index = this.database.findIndex(conf => conf.props.id === conference.props.id);
        this.database[index] = conference;
        conference.commit();
    }
}
exports.InMemoryConferenceRepository = InMemoryConferenceRepository;
//# sourceMappingURL=in-memory-conference-repository.js.map