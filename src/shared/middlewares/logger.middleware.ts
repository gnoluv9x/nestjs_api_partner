import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CustomLoggerService } from "../services/logger.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject("Logger") private logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log({
      message: "========== Request ==========",
      details: {
        method: req.method,
        path: req.path,
        query: req.query,
        body: `${JSON.stringify(req.body)}`,
        header: `${JSON.stringify(req.headers)}`,
      },
    });

    res.on("finish", () => {
      this.logger.log({
        message: "========== Response ==========",
        details: {
          status: res.statusCode,
        },
      });
    });

    next();
  }
}
