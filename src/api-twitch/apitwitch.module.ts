import { ApitwitchService } from './apitwitch.service';
import { ApitwitchController } from './apitwitch.controller';
import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { CreatorModule } from 'src/creators/creator.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => CreatorModule),
  ],
  controllers: [ApitwitchController],
  providers: [ApitwitchService],
  exports: [ApitwitchService]
})
export class ApitwitchModule {}
