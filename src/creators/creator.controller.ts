import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatorService } from './creator.service';
import { AddCreatorDTO } from './dto';
import { Creators } from './schemas/creator.schema';

const _creator = 'creator';

@ApiTags(_creator)
@Controller(_creator)
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) {}

  @Get()
  findAll() {
    return this.creatorService.findAll();
  }

  @ApiBody({ type: [AddCreatorDTO] })
  @Post()
  @ApiCreatedResponse({ description: 'The Creator has been successfully created.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async create(@Body() dto: AddCreatorDTO): Promise<Creators> {
    return this.creatorService.create(dto);
  }
}
