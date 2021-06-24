import { CreatorService } from './creator.service';
import { CreatorController } from './creator.controller';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatorFeatureProvider } from './schemas/creator.schema';
import { ApitwitchModule } from 'src/api-twitch/apitwitch.module';

@Module({
  imports: [
    MongooseModule.forFeature([CreatorFeatureProvider]),
    forwardRef(() => ApitwitchModule),
  ],
  controllers: [CreatorController],
  providers: [CreatorService],
})
export class CreatorModule {}
