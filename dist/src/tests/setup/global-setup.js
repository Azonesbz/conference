"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docker_manager_1 = require("./docker-manager");
const setup = async () => {
    await (0, docker_manager_1.startDocker)();
};
exports.default = setup;
//# sourceMappingURL=global-setup.js.map