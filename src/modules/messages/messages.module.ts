import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageScheme } from 'src/schemas/messages.schema';
import { MessageRepository } from './messages.repository';
import { StorageModule } from 'src/common/services/StoreFile/Storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageScheme }]),
    StorageModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessageRepository],
})
export class MessagesModule {}
