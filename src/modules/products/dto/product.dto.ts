import { Transform } from "class-transformer";
import {
  Equals,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import { LIST_ORDER_VALUE } from "src/constant";
import { MESSAGES } from "src/constant/message";
import {
  LIST_COMMISSION_TYPES,
  LIST_ORDER_BY_VALUES,
  LIST_PRODUCT_TYPES,
  LIST_PROVIDERS,
} from "src/constant/product";
import { PaginationDTO } from "src/shared/dto/pagination.dto";
import { IsArrayOfNumericStrings } from "src/shared/validators/isArrayOfNumeríctring";
import { IsCommaSeparatedNumberString } from "src/shared/validators/isCommaSeperatedString";

export class QueryAllProductDTO extends PaginationDTO {
  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsIn(LIST_PROVIDERS, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  provider: string;

  @IsOptional()
  @IsIn(LIST_PRODUCT_TYPES, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  type?: string;

  @IsOptional()
  @IsIn(LIST_ORDER_VALUE, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  @ValidateIf((obj) => !!obj.order_by)
  order?: string;

  @IsOptional()
  @IsIn(LIST_ORDER_BY_VALUES, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  @ValidateIf((obj) => !!obj.order)
  order_by?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  search?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  @Equals("phoneNumber", { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  searchType?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  @IsCommaSeparatedNumberString(true, {
    message: MESSAGES.VALIDATIONS.WRONG_FORMAT,
  })
  category?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  @IsIn(["0", "1"], { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  hot?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  @IsIn(["0", "1"], { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  bestSeller?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  @IsIn(LIST_COMMISSION_TYPES, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  commissionType?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  @IsCommaSeparatedNumberString(false, {
    message: MESSAGES.VALIDATIONS.WRONG_FORMAT,
  })
  filterCircle?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  @IsCommaSeparatedNumberString(false, {
    message: MESSAGES.VALIDATIONS.WRONG_FORMAT,
  })
  filterPrice?: string;

  @IsOptional()
  @Transform(({ value }) => {
    return value.split(",");
  })
  @IsArrayOfNumericStrings({
    message: MESSAGES.VALIDATIONS.WRONG_FORMAT,
  })
  ids?: string[];
}

export class QueryProductFilterDTO {
  @IsNotEmpty({ message: MESSAGES.VALIDATIONS.IS_NOT_EMPTY })
  @IsIn(LIST_PRODUCT_TYPES, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  type: string;
}
