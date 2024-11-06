import { Injectable } from '@nestjs/common';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { ChatRoomRepository } from './chat-rooms.repository';
import { I18nService } from 'nestjs-i18n';
import { PaginationOptions } from 'src/common/utils/pagination-options';
import { MessageRepository } from '../messages/messages.repository';
import { CreateTextMessageDto } from '../messages/dto/create-text-message.dto';
import { CreateFileMessageDto } from '../messages/dto/create-image-message.dto';
import { SearchMessageDto } from './dto/search-message.dto';

@Injectable()
export class ChatRoomsService {
  constructor(
    private chat_room_repository: ChatRoomRepository,
    private message_repository: MessageRepository,
    private readonly i18n: I18nService,
  ) {}
  create(user_id: string, createChatRoomDto: CreateChatRoomDto) {
    this.chat_room_repository.store(user_id, createChatRoomDto);
    return { message: this.i18n.t('modules.chat_room.register.success') };

  }

  findAll(options: PaginationOptions) {
    return this.chat_room_repository.index(options);
  }

  findOne(id: string) {
    return this.chat_room_repository.detail(id);
  }

  update(id: string, updateChatRoomDto: UpdateChatRoomDto) {
    this.chat_room_repository.update(id, updateChatRoomDto);
    return { message: this.i18n.t('modules.chat_room.update.success') };
  }

  remove(id: string) {
    this.chat_room_repository.remove(id);
    this.message_repository.deleteAllMessages(id);
    return { message: this.i18n.t('modules.chat_room.delete.success') };
  }

  async fileMessage(user_id: string, chat_room_id: string, data: CreateFileMessageDto) {
    await this.message_repository.storeFileMessage(
      user_id,
      chat_room_id,
      data,
    );
    return { message: this.i18n.t('modules.messages.store.success') };
  }

  async textMessage(user_id: string, chat_room_id: string, data: CreateTextMessageDto) {
    await this.message_repository.storeTextMessage(
      user_id,
      chat_room_id,
      data,
    );
    return { message: this.i18n.t('modules.messages.store.success') };
  }

  async getMessages(chat_room_id: string, options: PaginationOptions) {
    return await this.message_repository.index(chat_room_id, options);
  }

  async searchMessage(chat_room_id: string, options: SearchMessageDto) {
    return await this.message_repository.findByText(chat_room_id, options.text);
  }
}
