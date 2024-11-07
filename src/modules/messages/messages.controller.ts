import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IsValidMessage } from 'src/common/helpers/guards/is-valid-message.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('messages')
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}


  @Get(':id')
  @UseGuards(IsValidMessage)
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(IsValidMessage)
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @UseGuards(IsValidMessage)
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
