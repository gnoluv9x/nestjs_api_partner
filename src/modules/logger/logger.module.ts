import { Module } from "@nestjs/common";
import { LOGGER_INJECT_TOKEN } from "src/constant";
import { CustomLoggerService } from "./logger.service";

@Module({
  providers: [
    {
      provide: LOGGER_INJECT_TOKEN,
      useClass: CustomLoggerService,
    },
  ],
  exports: [LOGGER_INJECT_TOKEN],
})
export class LoggerModule {}
