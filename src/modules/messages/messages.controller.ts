import { Controller, Get, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IsValidMessage } from 'src/common/helpers/guards/is-valid-message.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('messages')
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}


  @Get(':id')
  @UseGuards(IsValidMessage)
  @ApiOperation({ summary: 'Regresa el detalle de un mensaje.' })
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(IsValidMessage)
  @ApiOperation({ summary: 'Actualiza un mensaje.' })
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @UseGuards(IsValidMessage)
  @ApiOperation({ summary: 'Elimina un mensaje.' })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
