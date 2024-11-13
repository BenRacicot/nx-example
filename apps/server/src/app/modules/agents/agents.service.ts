import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentsService {
  // create(createAgentDto: CreateAgentDto): Promise<IAgent | null> {
  //   return 'This action adds a new agent';
  // }

  // findAll(): Promise<IAgent[] | null> {
  //   return `This action returns all agents`;
  // }

  // findOne(id: number): Promise<IAgent | null> {
  //   return `This action returns a #${id} agent`;
  // }

  // update(id: number, updateAgentDto: UpdateAgentDto): Promise<IAgent | null> {
  //   return `This action updates a #${id} agent`;
  // }

  // remove(id: number): boolean {
  //   return `This action removes a #${id} agent`;
  // }
}
