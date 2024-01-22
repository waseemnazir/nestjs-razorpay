import { registerAs } from '@nestjs/config';

export const otpConfig = registerAs('otp', () => ({
  secret: process.env.OTP_SECRET,
}));
