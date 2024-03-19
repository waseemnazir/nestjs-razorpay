import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  ValidateIf,
} from "class-validator";

import { CurrencyType } from "../razorpay.enums";

export class CreateRazorpayOrderDTO {
  @ApiProperty({ example: 199 })
  @IsNumber()
  amount: number;

  /* 
  ISO code for the currency in which you want to accept the payment. The default length is 3 characters.
  */
  @ApiProperty({ enum: CurrencyType, example: CurrencyType.INR })
  @IsEnum(CurrencyType)
  currency: string;

  /*
   Receipt number that corresponds to this order, set for your internal reference.  
   Can have a maximum length of 40 characters and has to be unique. 
  */
  receipt: string;

  /* 
  Key-value pair that can be used to store additional information about the entity. 
  Maximum 15 key-value pairs, 256 characters (maximum) each. For example, "note_key": "Beam me up Scotty”. 
  */
  notes: object;

  /* 
  Indicates whether the customer can make a partial payment. Possible values: 
  true : The customer can make partial payments.
  false (default) : The customer cannot make partial payments.
  */

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  partial_payment: boolean;

  /*
   Minimum amount that must be paid by the customer as the first partial payment. 
   For example, if an amount of ₹700.00 is to be received from the customer in two installments of 
   #1 - ₹500.00, #2 - ₹200.00, then you can set this value as 50000. 
   This parameter should be passed only if partial_payment is true. 
  */

  @ApiProperty({ example: 99 })
  @ValidateIf((dto) => dto.partial_payment === true)
  first_payment_min_amount: number;
}
