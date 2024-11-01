import { Model } from 'mongoose';
import { Injectable  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationOptions } from '../../common/utils/pagination-options';
import { PaginationDto } from 'src/common/dto/pagination-response.dto';
import { Message, MessageDocument } from 'src/schemas/messages.schema';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
@Injectable()
export class MessageRepository {
 constructor(@InjectModel(Message.name) private model: Model<MessageDocument>){
 }

 async index(chat_room_id: string, options: PaginationOptions): Promise<PaginationDto<Message>>{
  const total = await this.model.countDocuments().exec();
  const items = parseInt(options.itemsPerPage); 
  const current_page = parseInt(options.page); 
  const total_pages = total > 0 ? Math.ceil( total / items): 1;
  const previous_page = current_page != 1  ? current_page - 1 : null;
  const next_page = current_page != total_pages ? current_page +  1 : null;
  const skip = current_page != 1 ? current_page * items : 0;
  const Messages = await this.model.find({chat_room: chat_room_id}).select({"_id":1, "text": 1})
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
  const user = await this.model.findById(id).select({"_id":1, "text": 1}).exec();
  return user;
 }

 async store(user_id: string, chat_room_id: string, data: CreateMessageDto):Promise<MessageDocument>{
  const new_Message = await this.model.create({ ...data, chat_room: chat_room_id, owner: user_id}); 
  return new_Message;
 }

  async update(id: string, data:UpdateMessageDto):Promise<MessageDocument>{
    const Message = await this.model.findById(id).exec();
    const updated_Message = await this.model.findByIdAndUpdate(Message._id, data, { new: true }).exec();
    return updated_Message;
  }

 async remove(id: string): Promise<MessageDocument>{
  const deleteResponse = await this.model.findByIdAndDelete(id);
  return deleteResponse;
 }
}