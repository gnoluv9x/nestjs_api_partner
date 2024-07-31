import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { QueryAllProductDTO, QueryProductFilterDTO } from "./dto/product.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("/filters")
  async getFilters(@Query() query: QueryProductFilterDTO) {
    console.log("Debug_here query: ", query);
    const response = await this.productsService.getFilters(query);

    return response;
  }

  @Get("/:id")
  async getPackageDetails(@Param("id", ParseIntPipe) id: number) {
    const response = await this.productsService.findOne(id);
    return response;
  }

  @Get()
  async getAll(@Query() query: QueryAllProductDTO) {
    const response = await this.productsService.getAll(query);

    return response;
  }
}
