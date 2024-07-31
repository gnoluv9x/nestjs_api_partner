import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpInterceptor } from "src/shared/interceptor/http.interceptor";
import { LoggerModule } from "../logger/logger.module";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  imports: [HttpModule, LoggerModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
  ],
})
export class ProductsModule {}
