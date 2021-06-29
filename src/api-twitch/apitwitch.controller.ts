import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApitwitchService } from './apitwitch.service';

const _apiTwitch = 'api-twitch';

@ApiTags(_apiTwitch)
@Controller(_apiTwitch)
export class ApitwitchController {
  constructor(private readonly apitwitchService: ApitwitchService) {}
    @Get('online/:id')
    getOnline(@Param('id') twitchId: string,) {
      return this.apitwitchService.getOnline(twitchId);
    }
    @Get('user/:id')
    getPhoto(@Param('id') id: string,) {
      return this.apitwitchService.getTwitchDetails(id);
    }

}
