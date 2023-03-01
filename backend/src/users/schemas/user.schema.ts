import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as bcrypt from 'bcrypt';
import { authConstants, jwtConstants } from "src/auth/constants";


const saltOrRounds = 10;


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    fullname: string;

    @Prop()
    birth: string;

    @Prop({ required: true, trim: true })
    password: string;

    @Prop({ required: true, enum: [1, 2] })
    role: number;

    @Prop({ required: true, default: 0 })
    loginAttempts: number

    @Prop()
    lockUntil: number


    validatePassword: Function
    incLoginAttempts: Function

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, saltOrRounds);

})

UserSchema.methods.validatePassword = function (password: string): boolean {
    try {
        return bcrypt.compareSync(password, this.password);
    } catch (error) {
        console.error("validatePassword:", error);
        return false;
    }
};

UserSchema.virtual('isLocked').get(function () {
    const date = Date.now();
    const isLock = !!(this.lockUntil && this.lockUntil > date)
    return isLock;
});

UserSchema.methods.incLoginAttempts = function (cb) {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb)
    }

    // otherwise we're incrementing
    const updates = { $inc: { loginAttempts: 1 } };
    // Lock account if we have reached max attempts and it's not locked already
    const max = authConstants.MAX_LOGIN_ATTEMPTS;
    const lock = authConstants.LOCK_TIME;
    if (this.loginAttempts + 1 >= max && !this.isLocked) {
        updates['$set'] = { lockUntil: Date.now() + lock };
    }
    console.log(updates, this.loginAttempts, this.lockUntil)
    return this.update(updates, cb);

}