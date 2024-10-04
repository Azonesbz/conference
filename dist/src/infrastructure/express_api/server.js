"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = void 0;
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8000;
const StartServer = async () => {
    app_1.default.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
    process.on('unhandledRejection', (err) => {
        console.log(`❌ Unhandled Rejection: ${err}`);
        process.exit(1);
    });
};
exports.StartServer = StartServer;
(0, exports.StartServer)().then(() => console.log("Server started"));
//# sourceMappingURL=server.js.map