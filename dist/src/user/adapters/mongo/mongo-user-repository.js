"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepository = void 0;
const user_entity_1 = require("../../entities/user.entity");
const mongo_user_1 = require("./mongo-user");
class UserMapper {
    toCore(model) {
        return new user_entity_1.User({
            id: model._id,
            emailAddress: model.emailAddress,
            password: model.password
        });
    }
    toPersistence(user) {
        return new mongo_user_1.MongoUser.UserModel({
            _id: user.props.id,
            emailAddress: user.props.emailAddress,
            password: user.props.password
        });
    }
}
class MongoUserRepository {
    constructor(model) {
        this.model = model;
        this.mapper = new UserMapper();
    }
    async findByEmailAddress(emailAddress) {
        const user = await this.model.findOne({ emailAddress });
        if (!user)
            return null;
        return this.mapper.toCore(user);
    }
    async create(user) {
        const record = this.mapper.toPersistence(user);
        await record.save();
    }
    async findById(id) {
        const user = await this.model.findOne({ _id: id });
        if (!user)
            return null;
        return this.mapper.toCore(user);
    }
}
exports.MongoUserRepository = MongoUserRepository;
//# sourceMappingURL=mongo-user-repository.js.map