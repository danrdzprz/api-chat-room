import { Model } from 'mongoose';
import { Injectable  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationOptions } from '../../common/utils/pagination-options';
import { PaginationDto } from 'src/common/dto/pagination-response.dto';
import { Message, MessageDocument } from 'src/schemas/messages.schema';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateTextMessageDto } from './dto/create-text-message.dto';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { sendToRoom } from 'src/sockets/rooms';
import { CreateFileMessageDto } from './dto/create-image-message.dto';

@Injectable()
@WebSocketGateway()
export class MessageRepository {
  @WebSocketServer()
  server: Server;
 constructor(@InjectModel(Message.name) private model: Model<MessageDocument>){
 }

 private storage_path = 'messages';


 async index(chat_room_id: string, options: PaginationOptions): Promise<PaginationDto<Message>>{
  const total = await this.model.countDocuments().exec();
  const items = parseInt(options.itemsPerPage); 
  const current_page = parseInt(options.page); 
  const total_pages = total > 0 ? Math.ceil( total / items): 1;
  const previous_page = current_page != 1  ? current_page - 1 : null;
  const next_page = current_page != total_pages ? current_page +  1 : null;
  const skip = current_page != 1 ? (current_page - 1) * items : 0;
  const Messages = await this.model.find({chat_room: chat_room_id}).select({"_id":1, "text": 1, "file_url": 1})
  .populate({path: 'owner',select: {'_id':1,'name':1}})
  .sort({createdAt: 'asc'})
  .skip(skip).limit(items).exec();
  const response = {
    data:Messages,
    total:total,
    total_pages: total_pages,
    current_page:current_page,
    previous_page:previous_page,
    next_page:next_page,
  }
  return response;
 }

 async detail(id : string|unknown):Promise<MessageDocument>{
  const message = await this.model.findById(id).select({"_id":1, "text": 1})
  .populate({path: 'owner',select: {'_id':1,'name':1}})
  .populate({path: 'chat_room',select: {'_id':1,'name':1}})
  .exec();
  return message;
 }

 async storeTextMessage(user_id: string, chat_room_id: string, data: CreateTextMessageDto):Promise<MessageDocument>{
  const new_Message = await this.model.create({ text: data.text, chat_room: chat_room_id, owner: user_id}); 
  sendToRoom(this.server, chat_room_id, 'new-message', new_Message);
  return new_Message;
 }

 async storeFileMessage(user_id: string, chat_room_id: string, data: CreateFileMessageDto):Promise<MessageDocument>{
  const new_Message = await this.model.create({ text: data.text, chat_room: chat_room_id, owner: user_id}); 

  console.log(data);
  if (data.file) {
    // const file_path = await this.storage_file.upload(
    //   `${this.storage_path}/documents/contracts/${contract_file.file.originalName}`,
    //   data.file.buffer,
    // );
  }

  sendToRoom(this.server, chat_room_id, 'new-message', new_Message);
  return new_Message;
 }

  async update(id: string, data:UpdateMessageDto):Promise<MessageDocument>{
    const message = await this.detail(id);
    const updated_Message = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    sendToRoom(this.server, message.chat_room._id, 'new-message', updated_Message);
    return updated_Message;
  }

 async remove(id: string): Promise<MessageDocument>{
  const message = await this.detail(id);
  const deleteResponse = await this.model.findByIdAndDelete(id);
  sendToRoom(this.server, message.chat_room._id, 'new-message', deleteResponse);
  return deleteResponse;
 }
}