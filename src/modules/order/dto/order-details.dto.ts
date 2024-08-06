import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class OrderDetailsDTO {
  @Expose({ name: "orderId" })
  @IsNotEmpty({ message: "orderId không được bỏ trông" })
  @IsNumberString({}, { message: "Sai định dạng orderId" })
  id: number;
}
