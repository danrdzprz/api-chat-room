import { Model } from 'mongoose';
import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationOptions } from '../../common/utils/pagination-options';
import { PaginationResponse } from '../../common/utils/pagination-response.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { DefaultResponse } from '../../common/utils/default-response.dto';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
@Injectable()
export class UserRepository {
 constructor(@InjectModel(User.name) private model: Model<UserDocument>){
 }

 async index(options: PaginationOptions): Promise<PaginationUserDto>{
  const total = await this.model.countDocuments().exec();
  const items = parseInt(options.itemsPerPage); 
  const current_page = parseInt(options.page); 
  const total_pages = total > 0 ? Math.ceil( total / items): 1;
  const previous_page = current_page != 1  ? current_page - 1 : null;
  const next_page = current_page != total_pages ? current_page +  1 : null;
  const skip = current_page != 1 ? current_page * items : 0;
  const users = await this.model.find().select({"_id":1, "name": 1, "email":1}).skip(skip).limit(items).exec();
  const response: PaginationUserDto = {
    data:users,
    total:total,
    total_pages: total_pages,
    current_page:current_page,
    previous_page:previous_page,
    next_page:next_page,
  }
  return response;
 }

 async detail(id : string|unknown):Promise<UserDocument>{
  const user = await this.model.findById(id).select({"_id":1, "name": 1, "email":1}).exec();
  return user;
 }

 async getHiddenParameters(id : string):Promise<UserDocument>{
  const user = await this.model.findById(id).select({"_id":1, "name": 1, "email":1, "password":1}).exec();
  return user;
 }

 async getByEmail(email : string):Promise<UserDocument>{
  const user = await this.model.findOne({email: email}).select({"_id":1, "name": 1, "email":1, "password":1}).exec();
  return user;
 }
 
 async store(data: CreateUserDto):Promise<UserDocument>{
  const new_user = await this.model.create(data); 
  return new_user;
 }

  async update(id: string, data:UpdateUserDto):Promise<UserDocument>{
    const user = await this.model.findById(id).exec();
    const updated_user = await this.model.findByIdAndUpdate(user._id, data, { new: true }).exec();
    return updated_user;
  }

 async remove(id: string): Promise<UserDocument>{
  const deleteResponse = await this.model.findByIdAndDelete(id);
  return deleteResponse;
 }
}