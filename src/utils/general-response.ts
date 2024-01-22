export class AbstractApiResponse<T> {
  data: T | null;
  error: object | string | null;
  message: string;
  statusCode: number;

  constructor(
    data: T | null,
    error: object | string | null,
    message: string,
    statusCode: number,
  ) {
    this.data = data;
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
  }

  static success<T>(
    data: T,
    message = 'Success',
    statusCode = 200,
    error = null,
  ): AbstractApiResponse<T> {
    return new AbstractApiResponse<T>(data, error, message, statusCode);
  }

  static created<T>(
    data: T,
    message = 'Resource created',
    statusCode = 201,
    error = null,
  ): AbstractApiResponse<T> {
    return new AbstractApiResponse<T>(data, error, message, statusCode);
  }

  static failure<T>(
    error: object | string,
    message: string,
    statusCode: number,
  ): AbstractApiResponse<T> {
    return new AbstractApiResponse<T>(null, error, message, statusCode);
  }

  static accepted<T>(
    error: object | string,
    message: string,
    statusCode: 202,
  ): AbstractApiResponse<T> {
    return new AbstractApiResponse<T>(null, error, message, statusCode);
  }
}
