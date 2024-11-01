import { createParamDecorator, ExecutionContext, ParseIntPipe } from "@nestjs/common";

export enum transformToTypeTypes {
  INT = 'int'
}

export interface IAddParamsToBodyArgs {
  name: string,
  transformTo?: transformToTypeTypes
  alias?: string
}

export const AddParamToBody = createParamDecorator ((args: IAddParamsToBodyArgs[], ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  for (const param of args) {
    let value = req.params[param.name];
    if(param.transformTo === transformToTypeTypes.INT){
      value = parseInt(value);
    }
    req.body[param.alias? param.alias : param.name ] = value;
  }
  return req;
});