"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(data) {
        this.initialState = { ...data };
        this.props = { ...data };
        Object.freeze(this.initialState);
    }
    update(data) {
        this.props = { ...this.props, ...data };
    }
    commit() {
        this.initialState = { ...this.props };
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map