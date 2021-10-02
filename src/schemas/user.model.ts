import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import * as bcrypt from "bcryptjs";
import {schemaOptions} from "../config";

const jwt = require('jsonwebtoken');

export const UserSchemaOptions: mongoose.SchemaOptions = {
    ...schemaOptions,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.password;
        }
    },
};

interface CommonAttributes {
    firstName: string;
    lastName: string;
    password: string;
    userType: string;
    email: string;
    age?: number;
    address?: string;
}

export interface DUser extends CommonAttributes {
}

export interface IUser extends CommonAttributes, mongoose.Document {
    comparePassword(password: string): Promise<boolean>;
}

export const UserSchema = new mongoose.Schema({
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    userType: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    age: {
        type: Schema.Types.Number,
        required: false,
    },
    address: {
        type: Schema.Types.String,
        required: false,
    }
}, UserSchemaOptions);

UserSchema.pre('save', function (next) {
    // @ts-ignore
    const user: IUser = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    // noinspection JSIgnoredPromiseFromCall
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        // noinspection JSIgnoredPromiseFromCall
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// UserSchema.methods.createAccessToken = function (this: IUser) {
//     return jwt.sign({user_id: this.id}, process.env.JWT_SECRET);
// };

UserSchema.methods.comparePassword = function (password: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // noinspection JSIgnoredPromiseFromCall 
        //@ts-ignore
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) {
                return reject(err);
            }
            return resolve(isMatch);
        });
    });
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
