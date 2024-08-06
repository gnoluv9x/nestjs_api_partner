import { IsInt, IsNotEmpty } from "class-validator";
import { MESSAGES } from "src/constant/message";

export class VerifyOtpDTO {
  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsInt({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  "orderId": number;

  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsInt({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  "otp": number;
}
