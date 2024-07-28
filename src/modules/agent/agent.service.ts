import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { AgentEntity } from "./entities/agent.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentEntity)
    private agentRepository: Repository<AgentEntity>,
  ) {}

  async findOne(id: number): Promise<AgentEntity | undefined> {
    try {
      const response = await this.agentRepository.findOne({ where: { id } });
      return response;
    } catch (error) {
      console.error("Debug_here error: ", error);
      throw error;
    }
  }
}
