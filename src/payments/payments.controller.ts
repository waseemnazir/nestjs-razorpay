import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { AbstractApiResponse } from "src/utils/general-response";
import { RazorpayService } from "./razorpay/services/razorpay.service";
import { CreateRazorpayOrderDTO } from "./razorpay/dto/create-order.dto";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { RazorpayTransactionDTO } from "./razorpay/dto/transaction.dto";

@ApiTags("razorpay-payments")
@Controller({
  path: "razorpay",
  version: "1",
})
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);
  constructor(private readonly razorpayService: RazorpayService) {}

  @Post("orders")
  @HttpCode(HttpStatus.CREATED)
  async createOrder<T>(
    @Body() createOrderDTO: CreateRazorpayOrderDTO
  ): Promise<AbstractApiResponse<T>> {
    try {
      const order = await this.razorpayService.createOrder(createOrderDTO);
      const response = AbstractApiResponse.created(order as T);
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

  @Get("orders")
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: "to", required: false })
  @ApiQuery({ name: "from", required: false })
  @ApiQuery({ name: "count", required: false })
  @ApiQuery({ name: "skip", required: false })
  async getOrders<T>(
    @Query("to") to?: number,
    @Query("from") from?: number,
    @Query("count") count?: number,
    @Query("skip") skip?: number
  ): Promise<AbstractApiResponse<T>> {
    try {
      const orders = await this.razorpayService.getAllOrders(
        to,
        from,
        count,
        skip
      );
      const response = AbstractApiResponse.success(orders as T);
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

  @Get("orders/:orderId")
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: "payments", required: false })
  async viewOrder<T>(
    @Param("orderId")
    orderId: string,
    @Query("payments") payments?: boolean
  ): Promise<AbstractApiResponse<T>> {
    try {
      const order = await this.razorpayService.getOrder(orderId, payments);
      const response = AbstractApiResponse.success(order as T);
      this.logger.log("Order fetched successfully");
      return response;
    } catch (error) {
      this.logger.error("Error during order fetching", error);
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

  @Post("payments/verify")
  @HttpCode(HttpStatus.OK)
  async validatetransaction<T>(
    @Body() verifyTransactionDTO: RazorpayTransactionDTO
  ): Promise<AbstractApiResponse<T>> {
    try {
      const verifyTransaction =
        await this.razorpayService.verifyTransaction(verifyTransactionDTO);
      const response = AbstractApiResponse.success(verifyTransaction as T);
      this.logger.log("Transaction verified successfully");
      return response;
    } catch (error) {
      this.logger.error("Error during transaction verification", error);
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
