import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: [8, 'Password must be 8 characters or more.'], maxlength: 100, })
  password: string;

  validatePassword: Function;
}


export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(this['password'], salt);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(this.get("password"), salt);
    this.set('password', hashed);
    return next();
  } catch (err) {
    return next(err);
  }
});

