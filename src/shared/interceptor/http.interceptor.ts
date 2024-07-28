import { HttpService } from "@nestjs/axios";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { Observable } from "rxjs";
import { PARTNER_SOURCE_VALUE } from "src/constant";

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private httpService: HttpService) {
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

      return config;
    });

    // request interceptors
    this.httpService.axiosRef.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
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
