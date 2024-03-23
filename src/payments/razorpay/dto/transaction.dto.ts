import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RazorpayTransactionDTO {
  /* 
  payment id return from the client after payment transaction success
  */
  @ApiProperty({ example: "pay_NpnRE0Imb60fBB" })
  @IsString()
  razorpay_payment_id: number;

  /* 
  order id for which payment has been done
  */
  @ApiProperty({ example: "order_NpnQIWK4dDS8un" })
  @IsString()
  razorpay_order_id: string;

  /*
  encrypted signature
  */
  @ApiProperty({
    example: "d63de00348dd759be6f10ac4a2c54440ce7088eca52d2ba93ce740df29c992f2",
  })
  @IsString()
  razorpay_signature: string;
}
