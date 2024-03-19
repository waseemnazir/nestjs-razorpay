import { Module } from "@nestjs/common";
import { configs } from "./config";
import { DataSource } from "typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";

import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsModule } from "./payments/payments.module";
import { RazorpayModule } from "nestjs-razorpay";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    RazorpayModule.forRoot({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    }),
    PaymentsModule,
  ],
})
export class AppModule {}
