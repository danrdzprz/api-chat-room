import { BadRequestException, CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { ChatRoomRepository } from "src/modules/chat-rooms/chat-rooms.repository";

@Injectable()
export class IsValidChatRoom implements CanActivate {
    constructor(private repository: ChatRoomRepository) { }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const {id} = request.params;
        if(!isValidObjectId(id)){
            throw new NotFoundException('Esta sala de chat no existe');
        }else{
                const record = await this.repository.detail(id);
                if(!record){
                    throw new NotFoundException('Esta sala de chat no existe');
                }
        }
        return true;
    }
}