import { Controller, Get, Query } from "@nestjs/common";
import { TestService } from "./test.service";
import { TestDTO } from "./test.validation";

@Controller("test")
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getHello(@Query() params: TestDTO) {
    console.log("Debug_here params: ", params);
    return params;
  }
}
