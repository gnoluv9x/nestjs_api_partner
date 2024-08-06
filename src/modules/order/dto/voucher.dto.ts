import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MESSAGES } from "src/constant/message";

export class VoucherDTO {
  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  couponCode: string;

  @Expose({ name: "product_id" })
  @IsNotEmpty({ message: "product_id không được bỏ trống" })
  @IsInt({ message: "Sai định dạng product_id" })
  "products[0][id]": number;

  @Expose({ name: "product_count" })
  @IsOptional()
  @IsInt({ message: "Sai định dạng product_count" })
  "products[0][count]"?: number;
}
