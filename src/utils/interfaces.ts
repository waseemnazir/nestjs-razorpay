import { Request } from 'express';

export interface NestRequest extends Request {
  user: {
    id: string;
    userType?: string;
  };
}
