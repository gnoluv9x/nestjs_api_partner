import { IsIn, IsInt, IsNotEmpty } from "class-validator";
import { MESSAGES } from "src/constant/message";
import { LIST_PAYMENT_METHODS } from "src/constant/order";

export class CreatePaymentDTO {
  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsInt({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  orderId: number;

  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsIn(LIST_PAYMENT_METHODS, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  paymentMethod: string;
}
