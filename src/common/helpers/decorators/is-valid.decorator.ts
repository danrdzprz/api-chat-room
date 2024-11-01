import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import {isValidObjectId } from 'mongoose';

export const IsValid = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    // return request.user;
    const {id} = request.params;
    if(!isValidObjectId(id)){
      throw new BadRequestException("El parametro no es valor valido");
    }
    return id;
  }
);