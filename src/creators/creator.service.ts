import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Injectable } from '@nestjs/common';
import { addCreatorDTO } from './dto';
import { Creators, CreatorFeatureProvider } from './schemas/creator.schema';

@Injectable()
export class CreatorService {
  constructor(
    @InjectModel(CreatorFeatureProvider.name)
    private readonly creatorModel: ReturnModelType<typeof Creators>,
  ) {}

  public findAll() {
    return this.creatorModel.find({ status: true });
  }
  public create(dto: addCreatorDTO): any {
    const created = new this.creatorModel(dto);
    return created.save();
  }
}
