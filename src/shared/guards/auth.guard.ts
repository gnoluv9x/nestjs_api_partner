import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";
import { HEADER_AGENT_NAME, HEADER_API_KEY_NAME } from "src/constant";
import { AgentService } from "src/modules/agent/agent.service";
import { CustomUnauthorizedException } from "./unauth-exception";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AgentService) private readonly agentService: AgentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const apiKey = request.headers?.[HEADER_API_KEY_NAME] || "";
    const agentId = request.headers?.[HEADER_AGENT_NAME] || "";

    if (!apiKey || !agentId) {
      throw new CustomUnauthorizedException();
    }

    const agentData = await this.agentService.findOne(+agentId);

    if (!agentData || agentData.apiKey !== apiKey) {
      throw new CustomUnauthorizedException();
    }

    request.headers["token"] = agentData.token;

    return true;
  }
}
