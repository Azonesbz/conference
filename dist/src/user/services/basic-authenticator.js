"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAuthenticator = void 0;
class BasicAuthenticator {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async authenticate(token) {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [emailAddress, password] = decoded.split(':');
        const user = await this.userRepository.findByEmailAddress(emailAddress);
        if (!user || user.props.password !== password) {
            throw new Error("Wrong credentials");
        }
        return user;
    }
}
exports.BasicAuthenticator = BasicAuthenticator;
//# sourceMappingURL=basic-authenticator.js.map