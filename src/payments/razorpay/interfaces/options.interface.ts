export interface GetOrdersOptions {
    to?: number;
    from?: number;
    count?: number;
    skip?: number;
  }
  
  export interface CreateOrderOptions {
    amount: number;
    currency: string;
    receipt: string;
  }
  