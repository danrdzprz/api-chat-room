import { Module } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoomsController } from './chat-rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomScheme } from 'src/schemas/chat-room.schema';
import { ChatRoomRepository } from './chat-rooms.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatRoom.name, schema: ChatRoomScheme }]),
  ],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService, ChatRoomRepository],
})
export class ChatRoomsModule {}
