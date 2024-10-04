"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomIDGenerator = void 0;
const uuid_1 = require("uuid");
class RandomIDGenerator {
    generate() {
        return (0, uuid_1.v4)();
    }
}
exports.RandomIDGenerator = RandomIDGenerator;
//# sourceMappingURL=random-id-generator.js.map