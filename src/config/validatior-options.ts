import { ValidationPipe, BadRequestException } from "@nestjs/common";
import { ValidationPipeOptions, ValidationError } from "@nestjs/common";
import { I18nContext } from 'nestjs-i18n';

const configValidator: ValidationPipeOptions = {
  whitelist: true,
  stopAtFirstError:true,
  exceptionFactory: (errors) => {
    const errorMessages = getConstraints(errors);
    return new BadRequestException(errorMessages);
  }
};

export const getConstraints = (errors : ValidationError[],key = "") => {
  const i18nFile = 'validation';
  const i18n = I18nContext.current();

  const errorMessages = {};
  errors.map(error => {
    const _key = key ? key+"."+error.property : error.property;
    if(error.constraints){
      const messages = Object.keys(error.constraints).map((constraint) =>
      
       i18n.t(`${i18nFile}.${constraint}`, {
            defaultValue: error.constraints[constraint],
            args: {
              ...error,
              ...(error.contexts?.[constraint] || {}),
            },
          })
      );
      errorMessages[_key] = messages;

    }else{
      if(error.children && error.children.length){
        const new_error_messages = getConstraints(error.children, _key);
          Object.assign(errorMessages, new_error_messages);
        }
    }
  });
  return errorMessages;
}
export const validationOptions = new ValidationPipe(configValidator);