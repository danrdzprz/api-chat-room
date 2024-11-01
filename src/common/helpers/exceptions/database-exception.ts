import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoError, MongoServerError } from 'mongodb';

@Catch(MongoError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const { name, errmsg} = exception;
    const errorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: errmsg,
      error: name,
    };

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}