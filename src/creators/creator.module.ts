import { CreatorService } from './creator.service';
import { CreatorController } from './creator.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatorFeatureProvider } from './schemas/creator.schema';

@Module({
  imports: [MongooseModule.forFeature([CreatorFeatureProvider])],
  controllers: [CreatorController],
  providers: [CreatorService],
})
export class CreatorModule {}
