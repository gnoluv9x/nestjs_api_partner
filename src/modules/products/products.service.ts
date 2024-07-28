import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { QueryAllProductDTO } from "./dto/product.dto";

@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService) {}

  async getAll(params: QueryAllProductDTO): Promise<any> {
    try {
      const responseData = await firstValueFrom(
        this.httpService.get("/api/products", { params }),
      );

      console.log("Debug_here responseData: ", responseData);
      return responseData;
    } catch (error) {
      console.log("Debug_here error: ", error);
    }
  }
}
