import { HttpService } from "@nestjs/axios";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { QueryAllProductDTO, QueryProductFilterDTO } from "./dto/product.dto";
import { CustomLoggerService } from "../logger/logger.service";
import { LOGGER_INJECT_TOKEN } from "src/constant";
import { MESSAGES } from "src/constant/message";
import { AxiosResponse } from "axios";

@Injectable()
export class ProductsService {
  constructor(
    private httpService: HttpService,
    @Inject(LOGGER_INJECT_TOKEN) private logger: CustomLoggerService,
  ) {}

  async getAll(params: QueryAllProductDTO): Promise<any> {
    try {
      const responseData = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.get("/api/products", {
          params,
        }),
      );

      return responseData;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new BadRequestException(
        error?.message || MESSAGES.EXCEPTIONS.NOT_FOUND_DATA,
      );
    }
  }

  async getFilters(params: QueryProductFilterDTO): Promise<any> {
    try {
      const responseData = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.get("/api/filters", { params }),
      );

      return responseData;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new BadRequestException(
        error?.message || MESSAGES.EXCEPTIONS.NOT_FOUND_DATA,
      );
    }
  }
  async findOne(slug: string): Promise<any> {
    try {
      const responseData = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.get(`/api/product/${slug}`),
      );

      if (responseData?.["suggest"]) {
        delete responseData["suggest"];
      }

      return responseData;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new BadRequestException(
        error?.message || MESSAGES.EXCEPTIONS.NOT_FOUND_DATA,
      );
    }
  }
}
