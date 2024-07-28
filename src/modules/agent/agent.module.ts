import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgentService } from "./agent.service";
import { AgentEntity } from "./entities/agent.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity])],
  controllers: [],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
