import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRazorpay } from "nestjs-razorpay";
import Razorpay from "razorpay";
import crypto from "crypto";
import { ConfigService } from "@nestjs/config";
import { CreateRazorpayOrderDTO } from "../dto/create-order.dto";
import { RazorpayTransactionDTO } from "../dto/transaction.dto";

import {
  GetOrdersOptions,
  CreateOrderOptions,
} from "../interfaces/options.interface";

@Injectable()
export class RazorpayService {
  private readonly logger = new Logger(RazorpayService.name);
  private secret: string;
  constructor(
    @InjectRazorpay() private readonly razorpayClient: Razorpay,
    private readonly configService: ConfigService
  ) {
    this.secret = this.configService.get<string>("razorpay.secretKey");
  }

  //create an order
  async createOrder(createOrderDTO: CreateRazorpayOrderDTO): Promise<any> {
    const { amount, currency, receipt } = createOrderDTO;

    const options: CreateOrderOptions = {
      amount: amount,
      currency: currency,
      receipt: receipt,
    };

    const order = await this.razorpayClient.orders.create(options);
    this.logger.debug("Created order data", order);
    return order;
  }

  // list all orders
  async getAllOrders(
    toDate?: number,
    fromDate?: number,
    count?: number,
    skip?: number
  ): Promise<any> {
    if (Number.isNaN(count) || count < 0 || count === 0) {
      count = 10;
    }

    if (Number.isNaN(skip) || skip < 0 || skip === 0) {
      skip = 1;
    }

    const options: GetOrdersOptions = {
      skip,
      count,
    };

    if (toDate) {
      options.to = toDate;
    }

    if (fromDate) {
      options.from = fromDate;
    }

    this.logger.debug("Get orders options", options);

    const orders = await this.razorpayClient.orders.all(options);

    return orders;
  }

  // view order with payments or without it

  async getOrder(orderId: string, payments?: boolean): Promise<any> {
    this.logger.debug("Order Id ", orderId);

    if (payments) {
      const orderWithPayments =
        await this.razorpayClient.orders.fetchPayments(orderId);
      return orderWithPayments;
    }

    const order = await this.razorpayClient.orders.fetch(orderId);

    return order;
  }

  //verify payment transaction success

  async verifyTransaction(
    transactionDTO: RazorpayTransactionDTO
  ): Promise<any> {
    this.logger.debug("payment Id ", transactionDTO.razorpay_payment_id);

    const shasum = crypto.createHmac("sha256", this.secret);
    shasum.update(
      `${transactionDTO.razorpay_order_id}|${transactionDTO.razorpay_payment_id}`
    );
    const digest = shasum.digest("hex");

    this.logger.debug("payment digest", digest);
    this.logger.debug("payment signature", transactionDTO.razorpay_signature);

    // Comparing our digest with the actual signature
    if (digest !== transactionDTO.razorpay_signature) {
      throw new HttpException(
        {
          data: null,
          message: "Transaction Invalid",
          status: HttpStatus.BAD_REQUEST,
          error: "BAD_REQUEST",
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const response = {
      orderId: transactionDTO.razorpay_order_id,
      paymentId: transactionDTO.razorpay_payment_id,
    };

    return response;
  }

  // view payment details

  async getPayment(paymentId: string): Promise<any> {
    this.logger.debug("Payment Id ", paymentId);

    const payment = await this.razorpayClient.payments.fetch(paymentId);

    return payment;
  }
}
