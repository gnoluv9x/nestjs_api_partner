import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getEntry(): string {
    return "This is public api for 1sell partner";
  }
}
