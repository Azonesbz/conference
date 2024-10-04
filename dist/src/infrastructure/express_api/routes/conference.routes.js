"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dependency_injection_1 = __importDefault(require("../config/dependency-injection"));
const conference_controllers_1 = require("../controllers/conference.controllers");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const router = (0, express_1.Router)();
router.use(authentication_middleware_1.isAuthenticated);
router.post('/conference', (0, conference_controllers_1.organizeConference)(dependency_injection_1.default));
router.patch('/conference/seats/:id', (0, conference_controllers_1.changeSeats)(dependency_injection_1.default));
exports.default = router;
//# sourceMappingURL=conference.routes.js.map