import { PIM_CORE_AGENT_TABLE_NAME } from "src/constant";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(PIM_CORE_AGENT_TABLE_NAME)
export class AgentEntity {
  @PrimaryGeneratedColumn({ name: "oo_id" })
  id: number;

  @Column({ type: "varchar", length: 190, nullable: true, name: "tokenApi" })
  apiKey: string;

  @Column({ type: "varchar", length: 190, nullable: true })
  token: string;
}
