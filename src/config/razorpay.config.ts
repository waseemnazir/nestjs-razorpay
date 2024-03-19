import { registerAs } from "@nestjs/config";

export const razorpayConfig = registerAs("razorpay", () => ({
  keyId: process.env.RAZORPAY_KEY_ID,
  secretKey: process.env.RAZORPAY_SECRET_KEY,
}));
