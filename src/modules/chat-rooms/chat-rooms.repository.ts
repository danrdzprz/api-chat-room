import { Model } from 'mongoose';
import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationOptions } from '../../common/utils/pagination-options';
import { ChatRoom, ChatRoomDocument } from 'src/schemas/chat-room.schema';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { PaginationDto } from 'src/common/dto/pagination-response.dto';
@Injectable()
export class ChatRoomRepository {
 constructor(@InjectModel(ChatRoom.name) private model: Model<ChatRoomDocument>){
 }

 async index(options: PaginationOptions): Promise<PaginationDto<ChatRoom>>{
  const total = await this.model.countDocuments().exec();
  const items = parseInt(options.itemsPerPage); 
  const current_page = parseInt(options.page); 
  const total_pages = total > 0 ? Math.ceil( total / items): 1;
  const previous_page = current_page != 1  ? current_page - 1 : null;
  const next_page = current_page != total_pages ? current_page +  1 : null;
  const skip = current_page != 1 ? current_page * items : 0;
  const ChatRooms = await this.model.find({}).select({"_id":1, "name": 1})
  .populate({path: 'owner',select: {'_id':1,'name':1}})
  .sort({createdAt: 'desc'})
  .skip(skip).limit(items).exec();
  const response = {
    data:ChatRooms,
    total:total,
    total_pages: total_pages,
    current_page:current_page,
    previous_page:previous_page,
    next_page:next_page,
  }
  console.log(ChatRooms);
  return response;
 }

 async detail(id : string|unknown):Promise<ChatRoomDocument>{
  const user = await this.model.findById(id).select({"_id":1, "name": 1}).exec();
  return user;
 }

 async store(user_id: string, data: CreateChatRoomDto):Promise<ChatRoomDocument>{
  const new_ChatRoom = await this.model.create({ ...data, owner: user_id}); 
  return new_ChatRoom;
 }

  async update(id: string, data:UpdateChatRoomDto):Promise<ChatRoomDocument>{
    const ChatRoom = await this.model.findById(id).exec();
    const updated_ChatRoom = await this.model.findByIdAndUpdate(ChatRoom._id, data, { new: true }).exec();
    return updated_ChatRoom;
  }

 async remove(id: string): Promise<ChatRoomDocument>{
  const deleteResponse = await this.model.findByIdAndDelete(id);
  return deleteResponse;
 }
}