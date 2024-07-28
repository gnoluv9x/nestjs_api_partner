import { Injectable } from "@nestjs/common";

@Injectable()
export class TestService {
  getAll() {
    console.log("==================== Debug_here running in test service", {
      a: 1,
      b: 2,
    });
    return "This is getAll in test service";
  }
}
