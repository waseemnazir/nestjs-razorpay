import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from "@nestjs/common";
import { AbstractApiResponse } from "src/utils/general-response";
import { RazorpayService } from "./razorpay/services/razorpay.service";
import { CreateRazorpayOrderDTO } from "./razorpay/dto/create-order.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('razorpay-payments')
@Controller({
  path: 'razorpay/create-order',
  version: '1',
})
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);
  constructor(private readonly razorpayService: RazorpayService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder<T>(
    @Body() createOrderDTO: CreateRazorpayOrderDTO
  ): Promise<AbstractApiResponse<T>> {
    try {
      const order = await this.razorpayService.createOrder(createOrderDTO);
      const response = AbstractApiResponse.success(order as T);
      this.logger.log("Order created successfully");
      return response;
    } catch (error) {
      this.logger.error("Error during order creation", error);
      throw new HttpException(
        {
          data: error.response.data,
          error: error.response.error,
          status: error.response.status,
          message: error.response.message,
        },
        error.response.status
      );
    }
  }
}
