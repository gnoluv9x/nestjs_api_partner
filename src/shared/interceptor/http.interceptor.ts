import { HttpService } from "@nestjs/axios";
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { AxiosError, AxiosResponse } from "axios";
import queryString from "query-string";
import { Observable } from "rxjs";
import { LOGGER_INJECT_TOKEN, PARTNER_SOURCE_VALUE } from "src/constant";
import { MESSAGES } from "src/constant/message";
import { CustomLoggerService } from "src/modules/logger/logger.service";

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(
    private httpService: HttpService,
    @Inject(LOGGER_INJECT_TOKEN) private logger: CustomLoggerService,
  ) {
    // settings
    this.httpService.axiosRef.defaults.baseURL = process.env.PIM_CORE_BASE_URL;
    this.httpService.axiosRef.defaults.timeout = 5000;
    this.httpService.axiosRef.defaults.headers["Content-Type"] =
      "application/json";
    this.httpService.axiosRef.defaults.paramsSerializer = (params) =>
      queryString.stringify(params, { skipNull: true, skipEmptyString: true });

    // request interceptors
    this.httpService.axiosRef.interceptors.request.use((config) => {
      if (config.method === "get") {
        config.params = {
          ...config.params,
          source: PARTNER_SOURCE_VALUE,
        };
      }

      if (config.method === "post") {
        if (config.data instanceof FormData) {
          config.data.append("source", PARTNER_SOURCE_VALUE);
        } else {
          if (config.data) {
            config.data["source"] = PARTNER_SOURCE_VALUE;
          } else {
            config.data = { source: PARTNER_SOURCE_VALUE };
          }
        }
      }

      this.logger.log({
        message: "================ Http request ================",
        details: config,
      });

      return config;
    });

    // request interceptors
    this.httpService.axiosRef.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse["data"] => {
        this.logger.log({
          message: "================ Http response ================",
          details: {
            data: response.data,
            status: response.status,
          },
        });

        return response.data;
      },
      (err) => {
        if (err instanceof AxiosError) {
          return Promise.reject({
            message:
              err.response.data?.message || MESSAGES.EXCEPTIONS.HAS_ERROR,
          });
        }

        return Promise.reject(err);
      },
    );
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle();
  }
}
