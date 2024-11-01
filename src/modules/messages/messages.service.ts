import { Injectable } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './messages.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class MessagesService {
  constructor(
    private message_repository: MessageRepository,
    private readonly i18n: I18nService,
  ) {}

  async findOne(id: string) {
    return await this.message_repository.detail(id);
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    await this.message_repository.update(id, updateMessageDto);
    return { message: this.i18n.t('modules.messages.update.delete') };

  }

  async remove(id: string) {
    await this.message_repository.remove(id);
    return { message: this.i18n.t('modules.messages.register.delete') };
  }
}
