import { ApitwitchService } from './apitwitch.service';
import { ApitwitchController } from './apitwitch.controller';
import { HttpModule, Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [ApitwitchController],
  providers: [ApitwitchService],
})
export class ApitwitchModule {}
