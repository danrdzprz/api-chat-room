import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { UserPayload } from '../auth/dto/user.payload';
import { Auth } from '../auth/auth.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaginationOptions } from 'src/common/utils/pagination-options';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crea una nueva sala de chat.' })
  create(@Auth() { id }: UserPayload, @Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatRoomsService.create(id, createChatRoomDto);
  }

  @Get()
  findAll(@Query() options:PaginationOptions) {
    return this.chatRoomsService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatRoomsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatRoomDto: UpdateChatRoomDto) {
    return this.chatRoomsService.update(id, updateChatRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatRoomsService.remove(id);
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string, @Query() options:PaginationOptions) {
    return this.chatRoomsService.getMessages(id, options);
  }

  @Post(':id/messages')
  @FormDataRequest()
  newMessage(@Auth() { id }: UserPayload, @Param('id') chat_room_id: string, @Body() data: CreateMessageDto) {
    return this.chatRoomsService.newMessage(id, chat_room_id, data);
  }
}
