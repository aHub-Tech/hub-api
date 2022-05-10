import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AprenderController } from './aprender.controller';
import { AprenderService } from './aprender.service';
import { MainStacksService } from './main-stacks.service';
import { MainStacksFeatureProvider } from './schemas/main-stacks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([MainStacksFeatureProvider]),
  ],
  controllers: [AprenderController],
  providers: [AprenderService, MainStacksService],
})
export class AprenderModule {}
