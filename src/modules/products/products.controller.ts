import { Controller, Get, Query } from "@nestjs/common";
import { QueryAllProductDTO } from "./dto/product.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(@Query() query: QueryAllProductDTO) {
    console.log("Debug_here query: ", query);
    const response = await this.productsService.getAll(query);

    return response;
  }
}
