import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  imports: [HttpModule, LoggerModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
