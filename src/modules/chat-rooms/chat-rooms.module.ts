import { Module } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoomsController } from './chat-rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomScheme } from 'src/schemas/chat-room.schema';
import { ChatRoomRepository } from './chat-rooms.repository';
import { Message, MessageScheme } from 'src/schemas/messages.schema';
import { MessageRepository } from '../messages/messages.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { StorageModule } from 'src/common/services/StoreFile/Storage.module';

@Module({
  imports: [
    NestjsFormDataModule,
    StorageModule,
    MongooseModule.forFeature([{ name: ChatRoom.name, schema: ChatRoomScheme }, { name: Message.name, schema: MessageScheme }]),
  ],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService, ChatRoomRepository, MessageRepository],
})
export class ChatRoomsModule {}
