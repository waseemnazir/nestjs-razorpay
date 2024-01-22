import { registerAs } from '@nestjs/config';

export const minioConfig = registerAs('minio', () => ({
  port: parseInt(process.env.MINIO_PORT, 10),
  endPoint: process.env.MINIO_ENDPOINT,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  useSsl: process.env.MINIO_USE_SSL === 'true',
  bucketName: process.env.BUCKET_NAME,
  urlExpiry: process.env.MINIO_URL_EXPIRY,
}));
