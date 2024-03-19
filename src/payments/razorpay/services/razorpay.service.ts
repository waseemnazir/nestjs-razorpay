import { Injectable } from "@nestjs/common";
import { InjectRazorpay } from "nestjs-razorpay";
import { CreateRazorpayOrderDTO } from "../dto/create-order.dto";
import Razorpay from "razorpay";

@Injectable()
export class RazorpayService {
  constructor(@InjectRazorpay() private readonly razorpayClient: Razorpay) {}

  async createOrder(createOrderDTO: CreateRazorpayOrderDTO): Promise<any> {
    const { amount, currency, receipt } = createOrderDTO;

    const options = {
      amount: amount,
      currency: currency,
      receipt: receipt,
    };

    try {
      const order = await this.razorpayClient.orders.create(options);
      console.log("order data", order);
      return order;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }
}
