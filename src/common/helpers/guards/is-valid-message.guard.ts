import { BadRequestException, CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { MessageRepository } from "src/modules/messages/messages.repository";

@Injectable()
export class IsValidMessage implements CanActivate {
    constructor(private repository: MessageRepository) { }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const {id} = request.params;
        if(!isValidObjectId(id)){
            throw new NotFoundException('Este mensaje no existe');
        }else{
                const record = await this.repository.detail(id);
                if(!record){
                    throw new NotFoundException('Este mensaje no existe');
                }
        }
        return true;
    }
}