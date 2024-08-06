import { Expose } from "class-transformer";
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { MESSAGES } from "src/constant/message";
import {
  LIST_ORDER_TYPES,
  LIST_PAYMENT_METHODS,
  LIST_PRODUCT_TYPES,
  LIST_VMG_TYPES,
} from "src/constant/order";
import { LIST_PROVIDERS } from "src/constant/product";

export class CreateCardDataOrderDto {
  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsIn(LIST_ORDER_TYPES, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  orderType: string;

  @Expose({ name: "productType" })
  @IsNotEmpty({ message: "productType không được để trống" })
  @IsIn(LIST_PRODUCT_TYPES, { message: "Sai định dạng productType" })
  type: string;

  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsNumberString(null, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  phone: string;

  @Expose({ name: "productId" })
  @IsNotEmpty({ message: "productId không được để trống" })
  @IsInt({ message: "Sai định dạng productId" })
  "products[0][id]": number;

  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsIn(LIST_VMG_TYPES, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  vmgType: string;

  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsIn(LIST_PAYMENT_METHODS, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  paymentMethod: string;

  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsIn(LIST_PROVIDERS, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  provider: string;

  @Expose({ name: "productCount" })
  @IsNotEmpty({ message: "productCount không được để trống" })
  @IsInt({ message: "Sai định dạng productCount" })
  "products[0][count]"?: number;

  @IsOptional()
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  couponCode?: string;
}
