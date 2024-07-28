import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from "@nestjs/common";
import { Response } from "express";
import { MESSAGES } from "src/constant/message";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const body = exception.getResponse() as any;

    response.status(status).json({
      success: false,
      error: MESSAGES.ROUTES.BAD_REQUEST,
      message: body?.message || "",
    });
  }
}
