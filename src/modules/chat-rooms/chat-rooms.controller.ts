import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { UserPayload } from '../auth/dto/user.payload';
import { Auth } from '../auth/auth.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaginationOptions } from 'src/common/utils/pagination-options';

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
}
