import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationDTO {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  limit: number = 10;
}
