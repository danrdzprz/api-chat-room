import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { UserPayload } from '../auth/dto/user.payload';
import { Auth } from '../auth/auth.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaginationOptions } from 'src/common/utils/pagination-options';
import { CreateTextMessageDto } from '../messages/dto/create-text-message.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { IsValidChatRoom } from 'src/common/helpers/guards/is-valid-chat-room.guard';
import { CreateFileMessageDto } from '../messages/dto/create-image-message.dto';
import { SearchMessageDto } from './dto/search-message.dto';

@Controller('chat-rooms')
@ApiBearerAuth()
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva sala de chat.' })
  create(@Auth() { id }: UserPayload, @Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatRoomsService.create(id, createChatRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Regresa una lista de salas de chat paginadas.' })
  findAll(@Query() options:PaginationOptions) {
    return this.chatRoomsService.findAll(options);
  }

  @Get(':id')
  @UseGuards(IsValidChatRoom)
  @ApiOperation({ summary: 'Regresa el detalle de la sala de chat.' })
  findOne(@Param('id') id: string) {
    return this.chatRoomsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(IsValidChatRoom)
  @ApiOperation({ summary: 'Actualiza la sala de chat.' })
  update(@Param('id') id: string, @Body() updateChatRoomDto: UpdateChatRoomDto) {
    return this.chatRoomsService.update(id, updateChatRoomDto);
  }

  @Delete(':id')
  @UseGuards(IsValidChatRoom)
  @ApiOperation({ summary: 'Elimina una sala de chat.' })
  remove(@Param('id') id: string) {
    return this.chatRoomsService.remove(id);
  }

  @Get(':id/messages')
  @UseGuards(IsValidChatRoom)
  @ApiOperation({ summary: 'Regresa los mensajes filtrados por sala de chat y paginados.' })
  getMessages(@Param('id') id: string, @Query() options:PaginationOptions) {
    return this.chatRoomsService.getMessages(id, options);
  }

  @Post(':id/text-message')
  @UseGuards(IsValidChatRoom)
  @ApiOperation({ summary: 'Guarda un mensaje de texto.' })
  textMessage(@Auth() { id }: UserPayload, @Param('id') chat_room_id: string, @Body() data: CreateTextMessageDto) {
    return this.chatRoomsService.textMessage(id, chat_room_id, data);
  }

  @Post(':id/file-message')
  @UseGuards(IsValidChatRoom)
  @FormDataRequest()
  @ApiOperation({ summary: 'Guarda un mensaje con archivo.' })
  fileMessage(@Auth() { id }: UserPayload, @Param('id') chat_room_id: string, @Body() data: CreateFileMessageDto) {
    return this.chatRoomsService.fileMessage(id, chat_room_id, data);
  }

  @Get(':id/search-message')
  @UseGuards(IsValidChatRoom)
  @FormDataRequest()
  @ApiOperation({ summary: 'Busca los mensajes filtrados por sala de chat.' })
  searchMessage( @Param('id') id: string, @Query() data:SearchMessageDto) {
    return this.chatRoomsService.searchMessage(id, data );
  }
}
