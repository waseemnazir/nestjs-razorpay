import { Injectable, Logger } from "@nestjs/common";
import { InjectRazorpay } from "nestjs-razorpay";
import Razorpay from "razorpay";
import { CreateRazorpayOrderDTO } from "../dto/create-order.dto";
import {
  GetOrdersOptions,
  CreateOrderOptions,
} from "../interfaces/options.interface";

@Injectable()
export class RazorpayService {
  private readonly logger = new Logger(RazorpayService.name);
  constructor(@InjectRazorpay() private readonly razorpayClient: Razorpay) {}



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
}
