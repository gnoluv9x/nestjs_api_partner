import { HttpService } from "@nestjs/axios";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { QueryAllProductDTO, QueryProductFilterDTO } from "./dto/product.dto";
import { CustomLoggerService } from "../logger/logger.service";
import { LOGGER_INJECT_TOKEN } from "src/constant";
import { MESSAGES } from "src/constant/message";

@Injectable()
export class ProductsService {
  constructor(
    private httpService: HttpService,
    @Inject(LOGGER_INJECT_TOKEN) private logger: CustomLoggerService,
  ) {}

  async getAll(params: QueryAllProductDTO): Promise<any> {
    try {
      const responseData = await lastValueFrom(
        this.httpService.get("/api/products", { params }),
      );

      console.log("Debug_here responseData: ", responseData);

      return responseData;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new BadRequestException(
        error?.message || MESSAGES.EXCEPTIONS.HAS_ERROR,
      );
    }
  }

  async getFilters(params: QueryProductFilterDTO): Promise<any> {
    try {
      const responseData = await lastValueFrom(
        this.httpService.get("/api/filters", { params }),
      );

      return responseData;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new BadRequestException(
        error?.message || MESSAGES.EXCEPTIONS.HAS_ERROR,
      );
    }
  }
  async findOne(id: number): Promise<any> {
    try {
      const responseData = await lastValueFrom(
        this.httpService.get(`/api/product/${id}`),
      );

      return responseData;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new BadRequestException(
        error?.message || MESSAGES.EXCEPTIONS.HAS_ERROR,
      );
    }
  }
}
