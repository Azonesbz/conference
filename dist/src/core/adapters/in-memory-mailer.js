"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryMailer = void 0;
class InMemoryMailer {
    constructor() {
        this.sentEmails = [];
    }
    async send(email) {
        this.sentEmails.push(email);
    }
}
exports.InMemoryMailer = InMemoryMailer;
//# sourceMappingURL=in-memory-mailer.js.map