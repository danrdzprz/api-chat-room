import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { ChatRoom } from './chat-room.schema';
export type MessageDocument = HydratedDocument<Message>;

@Schema({timestamps: true})
export class Message {
  _id: string;

  @Prop({ required: false })
  text: string;

  @Prop({ required: false })
  file_url: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required:true })
  owner: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: ChatRoom.name, required:true })
  chat_room: ChatRoom;
}

export const MessageScheme = SchemaFactory.createForClass(Message);