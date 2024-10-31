import {
  ValidationPipe,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ValidationPipeOptions } from '@nestjs/common';

const configValidator: ValidationPipeOptions = {
  whitelist: true,
  stopAtFirstError: true,
  exceptionFactory: (errors) => {
    const errorMessages = {};
    errors.forEach((error) => {
      errorMessages[error.property] = Object.values(error.constraints);
    });
    return new UnprocessableEntityException({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: errorMessages,
      error: 'Unprocessable entity',
    });
  },
};

export const validationOptions = new ValidationPipe(configValidator);
