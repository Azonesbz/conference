"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docker_manager_1 = require("./docker-manager");
const teardown = async () => {
    await (0, docker_manager_1.stopDocker)();
};
exports.default = teardown;
//# sourceMappingURL=global-teardown.js.map