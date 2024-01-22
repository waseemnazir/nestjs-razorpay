import { appConfig } from './app.config';
import { authConfig } from './auth.config';
import { databaseConfig } from './database.config';
import { minioConfig } from './minio.config';
import { twilioConfig } from './twilio.config';
import { otpConfig } from './otp.config';

export const configs = [
  appConfig,
  authConfig,
  databaseConfig,
  minioConfig,
  twilioConfig,
  otpConfig,
];
