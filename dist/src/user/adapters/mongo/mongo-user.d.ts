import mongoose, { Document } from "mongoose";
export declare namespace MongoUser {
    const CollectionName = "users";
    interface UserDocument extends Document {
        _id: string;
        emailAddress: string;
        password: string;
    }
    const UserSchema: mongoose.Schema<UserDocument, mongoose.Model<UserDocument, any, any, any, mongoose.Document<unknown, any, UserDocument> & UserDocument & Required<{
        _id: string;
    }> & {
        __v?: number | undefined;
    }, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserDocument>> & mongoose.FlatRecord<UserDocument> & Required<{
        _id: string;
    }> & {
        __v?: number | undefined;
    }>;
    const UserModel: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument> & UserDocument & Required<{
        _id: string;
    }> & {
        __v?: number | undefined;
    }, any>;
}
