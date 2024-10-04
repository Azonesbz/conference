"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDockerInstance = exports.stopDocker = exports.startDocker = void 0;
const path_1 = __importDefault(require("path"));
const testcontainers_1 = require("testcontainers");
let instance = null;
const startDocker = async () => {
    const composeFilePath = path_1.default.resolve(__dirname);
    const composeFile = 'docker-compose.yml';
    instance = await new testcontainers_1.DockerComposeEnvironment(composeFilePath, composeFile).up();
    console.log('🐳 Docker compose instance is running');
};
exports.startDocker = startDocker;
const stopDocker = async () => {
    if (!instance)
        return;
    try {
        await instance.down();
        instance = null;
        console.log("🐳 Docker is sleeping");
    }
    catch (error) {
        console.log(`🚫 Error stopping docker: ${error}`);
    }
};
exports.stopDocker = stopDocker;
const getDockerInstance = () => {
    if (!instance)
        throw new Error("Docker instance is not running");
    return instance;
};
exports.getDockerInstance = getDockerInstance;
//# sourceMappingURL=docker-manager.js.map