import { Expose } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, IsNumberString } from "class-validator";
import { LIST_REGISTER_TYPES } from "src/constant/order";

export class CreatePackageMobileOrderDto {
  @Expose({
    name: "registerType",
  })
  @IsNotEmpty({ message: "Vui lòng nhập registerType" })
  @IsIn(LIST_REGISTER_TYPES, { message: "Sai định dạng registerType" })
  "products[0][registerType]": string;

  @Expose({ name: "phone" })
  @IsNotEmpty({ message: "Vui lòng nhập số điện thoại" })
  @IsNumberString(null, { message: "Sai định dạng số điện thoại" })
  "phones[0]": string;

  @Expose({ name: "productId" })
  @IsNotEmpty({ message: "productId không được để trống" })
  @IsInt({ message: "Sai định dạng productId" })
  "products[0][id]": number;
}
