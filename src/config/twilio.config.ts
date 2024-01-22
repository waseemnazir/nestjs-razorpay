import { registerAs } from '@nestjs/config';

export const twilioConfig = registerAs('twilio', () => ({
  sid: process.env.TWILIO_SID,
  token: process.env.TWILIO_TOKEN,
  number: process.env.TWILIO_NUMBER,
}));
