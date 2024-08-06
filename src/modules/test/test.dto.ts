import { Exclude, Expose } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { MESSAGES } from "src/constant/message";

export class TestDTO {
  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsNumberString(null, {
    message: MESSAGES.VALIDATIONS.IS_NUMBER_STRING,
  })
  id: number;

  @Exclude()
  password: string;

  @IsEmail()
  @Expose({ name: "email" })
  new_email: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
