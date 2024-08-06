import { Controller, Get, Param, Query } from "@nestjs/common";
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

  @Get("/:slug")
  async getPackageDetails(@Param("slug") slug: string) {
    const response = await this.productsService.findOne(slug);
    return response;
  }

  @Get()
  async getAll(@Query() query: QueryAllProductDTO) {
    const response = await this.productsService.getAll(query);

    return response;
  }
}
