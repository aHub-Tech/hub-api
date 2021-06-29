import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApitwitchModule } from 'src/api-twitch/apitwitch.module';

@Module({
  imports: [
    // MongooseModule.forFeature([EventsFeatureProvider]),
    forwardRef(() => ApitwitchModule),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
