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
  file_path: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required:true })
  owner: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: ChatRoom.name, required:true })
  chat_room: ChatRoom;

  // @AfterLoad()
  // async setCustomAttributes() {
  //   const storage = new StorageFile();
  //   this.photo_url = await storage.get(this.photo);
  // }
}

export const MessageScheme = SchemaFactory.createForClass(Message);