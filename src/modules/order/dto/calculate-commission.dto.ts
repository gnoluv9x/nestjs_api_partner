import { Expose } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { MESSAGES } from "src/constant/message";
import {
  LIST_ORDER_TYPES,
  LIST_PAYMENT_METHODS,
  LIST_VMG_TYPES,
} from "src/constant/order";

export class CalculateCommissionDTO {
  @IsNotEmpty()
  @IsIn(LIST_ORDER_TYPES, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  orderType: string;

  @Expose({ name: "productId" })
  @IsNotEmpty({ message: "productId không được bỏ trống" })
  @IsInt({ message: "Sai định dạng productId" })
  "products[0][id]": number;

  @IsNotEmpty()
  @IsIn(LIST_VMG_TYPES, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  vmgType: string;

  @IsNotEmpty()
  @IsIn(LIST_PAYMENT_METHODS, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  paymentMethod: string;

  @Expose({ name: "productCount" })
  @IsOptional()
  @IsInt({ message: "Sai định dạng productCount" })
  "products[0][count]"?: number;
}
