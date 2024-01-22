import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof QueryFailedError) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Query failed error',
        message: 'Query failed',
        data: null,
      });
    } else if (exception instanceof HttpException) {
      const httpException = exception as HttpException;
      const status = httpException.getStatus();

      const responseObj = httpException.getResponse();
      let errors = null;
      if (
        typeof responseObj === 'object' &&
        responseObj !== null &&
        'errors' in responseObj
      ) {
        errors = responseObj.errors;
      }

      const errorResponse = {
        statusCode: status,
        error: errors || httpException.message || 'Something went wrong !',
        message: 'Something went wrong',
        data: null,
      };

      response.status(status).send(errorResponse);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: exception.message || 'Something went wrong',
        message: 'Internal server error',
        data: null,
      });
    }
  }
}
