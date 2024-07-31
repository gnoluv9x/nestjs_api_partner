import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import databaseConfig from "./config/database.config";
import { AgentModule } from "./modules/agent/agent.module";
import { LoggerModule } from "./modules/logger/logger.module";
import { OrderModule } from "./modules/order/order.module";
import { ProductsModule } from "./modules/products/products.module";
import { TestModule } from "./modules/test/test.module";
import { NotFoundExceptionFilter } from "./shared/exceptions/not-found.exception";
import { AuthGuard } from "./shared/guards/auth.guard";
import { LoggerMiddleware } from "./shared/middlewares/logger.middleware";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig()),
    TestModule,
    LoggerModule,
    AgentModule,
    OrderModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
