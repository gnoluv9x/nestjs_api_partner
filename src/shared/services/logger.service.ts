"use client";
import { Injectable, LoggerService } from "@nestjs/common";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { ILoggerMessage } from "src/interfaces/message.interface";
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: winston.Logger;

  private commonLoggerConfig = {
    datePattern: "DD-MM-YYYY",
    zippedArchive: false,
    // maxFiles: "30d", // days to keep log files
    filename: `logs/%DATE%.log`,
  };

  constructor() {
    this.initializeLogger();
  }

  private initializeLogger() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.printf(({ timestamp, level, message }) => {
          const newTimeStamp = dayjs
            .utc(timestamp)
            .tz("Asia/Bangkok")
            .format("HH:mm:ss DD-MM-YYYY Z");

          return `[${newTimeStamp}] ${level.toUpperCase()}: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile(this.commonLoggerConfig),
      ],
    });
  }

  log(message: ILoggerMessage | string, context?: string) {
    const formatedMsg = this.formatMessage(message);
    this.logger.info(formatedMsg, { context });
  }

  error(message: ILoggerMessage | string, trace: string, context?: string) {
    const formatedMsg = this.formatMessage(message);
    this.logger.error(formatedMsg, { trace, context });
  }

  warn(message: ILoggerMessage | string, context?: string) {
    const formatedMsg = this.formatMessage(message);
    this.logger.warn(formatedMsg, { context });
  }

  debug(message: ILoggerMessage | string, context?: string) {
    const formatedMsg = this.formatMessage(message);
    this.logger.debug(formatedMsg, { context });
  }

  verbose(message: ILoggerMessage | string, context?: string) {
    const formatedMsg = this.formatMessage(message);
    this.logger.verbose(formatedMsg, { context });
  }

  private formatMessage(message: ILoggerMessage | string): string {
    if (typeof message === "string") {
      return message;
    }
    if (typeof message === "object") {
      return JSON.stringify(message, null, 2);
    }
    return String(message);
  }
}
