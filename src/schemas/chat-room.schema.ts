import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema({timestamps: true})
export class ChatRoom {
  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required:true })
  owner: User;
}

export const ChatRoomScheme = SchemaFactory.createForClass(ChatRoom);