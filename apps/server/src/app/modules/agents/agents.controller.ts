import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { IAgent } from '@interfaces';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  // @Post()
  // create(@Body() createAgentDto: CreateAgentDto): Promise<IAgent | null> {
  //   return this.agentsService.create(createAgentDto);
  // }

  // @Get()
  // findAll(): Promise<IAgent[] | null> {
  //   return this.agentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<IAgent | null> {
  //   return this.agentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto): Promise<IAgent | null> {
  //   return this.agentsService.update(id, updateAgentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): boolean {
  //   return this.agentsService.remove(id);
  // }
}
