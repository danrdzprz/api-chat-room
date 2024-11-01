import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageScheme } from 'src/schemas/messages.schema';
import { MessageRepository } from './messages.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageScheme }]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessageRepository],
})
export class MessagesModule {}
