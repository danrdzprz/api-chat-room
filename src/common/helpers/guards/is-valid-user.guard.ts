import { BadRequestException, CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { UserRepository } from "src/modules/users/user.repository";

@Injectable()
export class IsValidUser implements CanActivate {
    constructor(private repository: UserRepository) { }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const {id} = request.params;
        if(!isValidObjectId(id)){
            throw new NotFoundException('Este usuario no existe');
        }else{
                const record = await this.repository.detail(id);
                if(!record){
                    throw new NotFoundException('Este usuario no existe');
                }
        }
        return true;
    }
}