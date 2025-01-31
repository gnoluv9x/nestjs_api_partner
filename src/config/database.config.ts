import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AgentEntity } from "src/modules/agent/entities/agent.entity";

export default registerAs(
  "database",
  (): TypeOrmModuleOptions => ({
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // autoLoadEntities: true,
    entities: [AgentEntity],
    synchronize: false,
  }),
);
