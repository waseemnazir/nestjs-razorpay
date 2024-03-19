import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { RazorpayService } from './razorpay/services/razorpay.service';

@Module({
  controllers: [PaymentsController],
  providers: [RazorpayService],
})
export class PaymentsModule {}
