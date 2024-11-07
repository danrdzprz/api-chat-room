import { registerDecorator, ValidationOptions } from "class-validator";
import { UniqueValidator } from "./rules/UniqueRule";

export interface Args {
  table: string,
  with_columns?: string[],
  ignore?:string,
  with_deleted?:boolean,
}

export function Unique(args: Args, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUniqueDB',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [args], 
      validator: UniqueValidator,
    });
  };
}