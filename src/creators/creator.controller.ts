import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { addCreatorDTO } from './dto';

@Controller("creator")
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) {}

  @Get()
  findAll() {
    return this.creatorService.findAll();
  }

  @Post()
  async create(@Body() dto: addCreatorDTO): Promise<any> {
    return this.creatorService.create(dto);
  }

}
