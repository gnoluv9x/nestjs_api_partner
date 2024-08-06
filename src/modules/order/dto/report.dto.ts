import { OmitType } from "@nestjs/mapped-types";
import { IsIn, IsOptional, IsString } from "class-validator";
import { MESSAGES } from "src/constant/message";
import { LIST_ORDER_STATUS } from "src/constant/order";
import { LIST_PROVIDERS } from "src/constant/product";
import { PaginationDTO } from "src/shared/dto/pagination.dto";
import { IsCommaSeparatedNumberString } from "src/shared/validators/isCommaSeperatedString";
import { IsValidDate } from "src/shared/validators/isValidDate";

export class OrderReportDTO extends PaginationDTO {
  @IsOptional()
  @IsCommaSeparatedNumberString(true, {
    message: MESSAGES.VALIDATIONS.WRONG_FORMAT,
  })
  "listBds": string;

  @IsOptional()
  @IsCommaSeparatedNumberString(true, {
    message: MESSAGES.VALIDATIONS.WRONG_FORMAT,
  })
  "listAgents": string;

  @IsOptional()
  @IsIn(LIST_PROVIDERS, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  "networkProvider": string;

  @IsOptional()
  @IsIn(["0", "1"], {
    message: MESSAGES.VALIDATIONS.WRONG_FORMAT,
  })
  "conditionSuccessDate": string = "0";

  @IsOptional()
  @IsIn(LIST_ORDER_STATUS, { message: MESSAGES.VALIDATIONS.WRONG_FORMAT })
  "orderStatus": string;

  @IsOptional()
  @IsString()
  "search": string;

  @IsOptional()
  @IsValidDate()
  "start_date": string;

  @IsOptional()
  @IsValidDate()
  "to_date": string;

  "responseType": number = 2;
  "order": string = "orderdate";
  "order_by": string = "desc";
}

export class ReportSummaryDTO extends OmitType(OrderReportDTO, [
  "limit",
  "page",
  "order_by",
  "order",
] as const) {}
