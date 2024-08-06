import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
  imports: [HttpModule, LoggerModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
