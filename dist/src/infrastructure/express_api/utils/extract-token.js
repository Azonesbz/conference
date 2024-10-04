"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractToken = void 0;
function extractToken(header) {
    const [prefix, token] = header.split(' ');
    if (prefix !== 'Basic')
        return null;
    return token;
}
exports.extractToken = extractToken;
//# sourceMappingURL=extract-token.js.map