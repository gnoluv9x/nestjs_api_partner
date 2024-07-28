import { HttpExceptionOptions, UnauthorizedException } from "@nestjs/common";
import { MESSAGES } from "src/constant/message";

export class CustomUnauthorizedException extends UnauthorizedException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    if (!objectOrError) {
      objectOrError = {
        success: false,
        message: MESSAGES.EXCEPTIONS.UNAUTH,
      };
    }

    // Gọi constructor của lớp cha (UnauthorizedException)
    super(objectOrError, descriptionOrOptions);
  }
}
