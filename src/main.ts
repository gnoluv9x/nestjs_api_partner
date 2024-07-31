import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import "winston-daily-rotate-file";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger({ instance: winstonLogger }),
    cors: {
      allowedHeaders: "*",
      origin: "*",
      credentials: true,
    },
  });

  const port = process.env.PORT || 3000;

  // use global pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // bỏ các thuộc tính ko có trong DTO
      transform: true, // sử dụng transform validator,
    }),
  );

  // prefix endpoint
  app.setGlobalPrefix("/v1");

  await app.listen(port).then(() => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
