import { HttpService } from "@nestjs/axios";
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AxiosResponse } from "axios";
import { lastValueFrom, map } from "rxjs";
import { LOGGER_INJECT_TOKEN } from "src/constant";
import { MESSAGES } from "src/constant/message";
import { LIST_REGISTER_TYPES } from "src/constant/order";
import { CustomLoggerService } from "../logger/logger.service";
import { CalculateCommissionDTO } from "./dto/calculate-commission.dto";
import { CreateCardDataOrderDto } from "./dto/create-order-card-datacode.dto";
import { CreatePackageMobileOrderDto } from "./dto/create-order-package.dto";
import { CreatePaymentDTO } from "./dto/create-payment.dto";
import { VerifyOtpDTO } from "./dto/verify-otp.dto";
import { VoucherDTO } from "./dto/voucher.dto";
import { OrderDetailsDTO } from "./dto/order-details.dto";
import { OrderReportDTO, ReportSummaryDTO } from "./dto/report.dto";

@Injectable()
export class OrderService {
  constructor(
    private httpService: HttpService,
    @Inject(LOGGER_INJECT_TOKEN) private logger: CustomLoggerService,
  ) {}

  async applyVoucher(params: VoucherDTO) {
    try {
      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.get("/api/coupon/calculation", { params }),
      );

      return response;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new NotFoundException(
        error?.message || MESSAGES.EXCEPTIONS.NOT_FOUND_DATA,
      );
    }
  }

  async createCardData(body: CreateCardDataOrderDto, auth: string) {
    try {
      const formData = new FormData();

      console.log("Debug_here body: ", body);

      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.post("/api/order/card-data", formData, {
          headers: {
            Authorization: auth,
            "Content-Type": "multipart/form-data",
          },
        }),
      );

      return {
        success: true,
        ...response,
      };
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

  async createPackagemobile(body: CreatePackageMobileOrderDto, auth: string) {
    try {
      const formData = new FormData();

      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      formData.append("type", "packagemobile");

      if (body["products[0][registerType]"] === LIST_REGISTER_TYPES[2]) {
        formData.append("products[0][paymentMethod]", "vietqr");
      }

      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService
          .post("/api/commit-order-many", formData, {
            headers: {
              Authorization: auth,
              "Content-Type": "multipart/form-data",
            },
          })
          .pipe(
            map((list: any) => {
              return list[0];
            }),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            map(({ itemIndex, ...rest }) => rest),
          ),
      );

      if (response.result === 1) {
        return {
          success: true,
          ...response,
        };
      } else {
        throw new Error(response.message);
      }
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

  async verifyOtp(body: VerifyOtpDTO) {
    try {
      console.log("Debug_here body body body: ", body);
      const formData = new FormData();

      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService
          .post("/api/confirmOtp", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .pipe(map(({ done, ...rest }: any) => rest)),
      );

      if (response.result) {
        return response;
      } else {
        throw new Error(response?.message);
      }
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

  async createPayment(body: CreatePaymentDTO, auth: string) {
    try {
      const formData = new FormData();

      Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
      });

      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.post("/api/agent/payment", formData, {
          headers: {
            Authorization: auth,
            "Content-Type": "multipart/form-data",
          },
        }),
      );

      return {
        success: true,
        ...response,
      };
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

  async calculationComission(params: CalculateCommissionDTO, auth: string) {
    try {
      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.get("/api/agent/commission-calculation-order", {
          params,
          headers: {
            Authorization: auth,
          },
        }),
      );

      console.log("Debug_here response: ", response);

      return response;
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

  async getOrderDetails(params: OrderDetailsDTO, auth: string) {
    try {
      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService
          .get("/api/agent/order", {
            params,
            headers: {
              Authorization: auth,
            },
          })
          .pipe(map((resp) => resp?.data)),
      );

      return response;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new HttpException(
        error?.message || MESSAGES.EXCEPTIONS.NOT_FOUND_DATA,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getReport(data: OrderReportDTO, auth: string) {
    try {
      const params = Object.keys(data).reduce((result, cur) => {
        const value = data[cur];

        if (cur === "listBds") {
          const splitedArr: string[] = value.split(",");

          splitedArr.forEach((val, idx) => {
            const key = `bd[${idx}]`;
            result[key] = val;
          });
        } else if (cur === "listAgents") {
          const splitedArr: string[] = value.split(",");

          splitedArr.forEach((val, idx) => {
            const key = `ctv[${idx}]`;
            result[key] = val;
          });
        } else {
          result[cur] = value;
        }

        return result;
      }, {});

      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.get("/api/agent/list-order", {
          params,
          headers: {
            Authorization: auth,
          },
        }),
      );

      return response;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new HttpException(
        error?.message || MESSAGES.EXCEPTIONS.NOT_FOUND_DATA,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getReportSummary(data: ReportSummaryDTO, auth: string) {
    try {
      const params = Object.keys(data).reduce((result, cur) => {
        const value = data[cur];

        if (cur === "listBds") {
          const splitedArr: string[] = value.split(",");

          splitedArr.forEach((val, idx) => {
            const key = `bd[${idx}]`;
            result[key] = val;
          });
        } else if (cur === "listAgents") {
          const splitedArr: string[] = value.split(",");

          splitedArr.forEach((val, idx) => {
            const key = `ctv[${idx}]`;
            result[key] = val;
          });
        } else {
          result[cur] = value;
        }

        return result;
      }, {});

      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.get("/api/agent/order-summary", {
          params,
          headers: {
            Authorization: auth,
          },
        }),
      );

      return response;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new HttpException(
        error?.message || MESSAGES.EXCEPTIONS.NOT_FOUND_DATA,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getListAgents(auth: string) {
    try {
      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.get("/api/agent/listing", {
          params: {
            page: 1,
            limit: 999999,
            screen: "listAgentBdChoose",
          },
          headers: {
            Authorization: auth,
          },
        }),
      );

      return response;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new HttpException(
        error?.message || MESSAGES.EXCEPTIONS.NOT_FOUND_DATA,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getListBds(auth: string) {
    try {
      const response = await lastValueFrom<AxiosResponse["data"]>(
        this.httpService.get("/api/agent/listing", {
          params: {
            page: 1,
            limit: 999999,
            screen: "parentlistBd",
            typeList: "listAgentChild",
          },
          headers: {
            Authorization: auth,
          },
        }),
      );

      return response;
    } catch (error) {
      this.logger.log({
        message: "Error",
        details: error,
      });

      throw new HttpException(
        error?.message || MESSAGES.EXCEPTIONS.NOT_FOUND_DATA,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
