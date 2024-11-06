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
import { StorageService } from 'src/common/services/StoreFile/Storage.service';

@Injectable()
@WebSocketGateway()
export class MessageRepository {
  
  @WebSocketServer()
  server: Server;
 constructor(
    @InjectModel(Message.name) private model: Model<MessageDocument>,
    private storage_file: StorageService,
  ){
  }

 async index(chat_room_id: string, options: PaginationOptions): Promise<PaginationDto<MessageDocument>>{
  const total = await this.model.find({chat_room: chat_room_id}).countDocuments().exec();
  const items = parseInt(options.itemsPerPage); 
  const current_page = parseInt(options.page); 
  const total_pages = total > 0 ? Math.ceil( total / items): 1;
  // const total_pages = Math.floor((total - 1)/ items) + 1;
  const previous_page = current_page != 1  ? current_page - 1 : null;
  const next_page = current_page != total_pages ? current_page +  1 : null;
  const skip = current_page != 1 ? (current_page - 1) * items : 0;
  const messages = await this.model.find({chat_room: chat_room_id}).select({"_id":1, "text": 1, "file_path": 1, "createdAt": 1})
  .populate({path: 'owner',select: {'_id':1,'name':1}})
  .sort({createdAt: 'desc'})
  .skip(skip).limit(items).lean().exec();

  messages.map( async x => {
    x.file_url = x.file_path ? await this.storage_file.getUrl(x.file_path) : null;
    return x;
  });

  const response = {
    data:messages as MessageDocument[],
    total:total,
    total_pages: total_pages,
    current_page:current_page,
    previous_page:previous_page,
    next_page:next_page,
  }
  return response;
 }

 async deleteAllMessages(chat_room_id: string){
   const messages = await this.model.find({})
   .select({"_id":1, "text": 1, "file_path": 1, "createdAt": 1})
   .exec();
   for (const message of messages) {
      await this.remove(message._id);
   }
 }

 async detail(id : string|unknown):Promise<MessageDocument>{
  const message = await this.model.findById(id).select({"_id":1, "text": 1, "file_path": 1, "createdAt": 1 })
  .populate({path: 'owner',select: {'_id':1,'name':1}})
  .populate({path: 'chat_room',select: {'_id':1,'name':1}})
  .lean()
  .exec();
  message.file_url = message.file_path ? await this.storage_file.getUrl(message.file_path) : null;
  return message as MessageDocument;
 }

 async findByText(id : string|unknown, text:string):Promise<MessageDocument[]>{
  const messages = await this.model.find({chat_room: id, text: { $regex: '.*' + text + '.*' } })
  .select({"_id":1, "text": 1, "file_path": 1, "createdAt": 1 })
  .populate({path: 'owner',select: {'_id':1,'name':1}})
  .populate({path: 'chat_room',select: {'_id':1,'name':1}})
  .limit(10)
  .lean()
  .exec();

  messages.map( async x => {
    x.file_url = x.file_path ? await this.storage_file.getUrl(x.file_path) : null;
    return x;
  });
  return messages as MessageDocument[];
 }

 async storeTextMessage(user_id: string, chat_room_id: string, data: CreateTextMessageDto):Promise<MessageDocument>{
  const new_Message = await this.model.create({ text: data.text, chat_room: chat_room_id, owner: user_id}); 
  const detail = await this.detail(new_Message._id);
  sendToRoom(this.server, chat_room_id, 'new-message', detail);
  return new_Message;
 }

 async storeFileMessage(user_id: string, chat_room_id: string, data: CreateFileMessageDto):Promise<MessageDocument>{
  const new_Message = await this.model.create({ chat_room: chat_room_id, owner: user_id}); 
  if (data.file) {
    const path = await this.storage_file.upload(`${new_Message._id}_${data.file.originalName}`, data.file.buffer);
    const updated_Message = await this.model.findByIdAndUpdate(new_Message._id, {file_path: path}, { new: true }).exec();
    const detail = await this.detail(new_Message._id);
    sendToRoom(this.server, chat_room_id, 'new-message', detail);
    return updated_Message;
  }
 }

  async update(id: string, data:UpdateMessageDto):Promise<MessageDocument>{
    const message = await this.detail(id);
    const updated_Message = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    sendToRoom(this.server, message.chat_room._id, 'update-message', updated_Message);
    return updated_Message;
  }

 async remove(id: string): Promise<MessageDocument>{
  const message = await this.detail(id);
  const deleteResponse = await this.model.findByIdAndDelete(id);
  if(message.file_path){
    await this.storage_file.delete(message.file_path);
  }
  sendToRoom(this.server, message.chat_room._id, 'delete-message', deleteResponse);
  return message;
 }
}