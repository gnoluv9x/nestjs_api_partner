import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { HttpModule } from "@nestjs/axios";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpInterceptor } from "src/shared/interceptor/http.interceptor";

@Module({
  imports: [HttpModule],
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
