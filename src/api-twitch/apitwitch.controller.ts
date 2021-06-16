import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApitwitchService } from './apitwitch.service';

const _apiTwitch = 'api-twitch';

@ApiTags(_apiTwitch)
@Controller(_apiTwitch)
export class ApitwitchController {
  constructor(private readonly apitwitchService: ApitwitchService) {}
    @Get(':id')
    getUserId(@Param('id') id: string,) {
      return this.apitwitchService.getUserId(id);
    }

}
