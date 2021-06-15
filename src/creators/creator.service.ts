import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Injectable } from '@nestjs/common';
import { AddCreatorDTO } from './dto';
import { Creators, CreatorFeatureProvider } from './schemas/creator.schema';

@Injectable()
export class CreatorService {
  constructor(
    @InjectModel(CreatorFeatureProvider.name)
    private readonly creatorModel: ReturnModelType<typeof Creators>,
  ) {}

  public async findAll(status: boolean = true): Promise<any> {
    const creators = await this.creatorModel.find({ status }).lean();

    const response = creators.map((creator) => {
      const { password, email, ...result } = creator;

      // TODO: apos fazer logica para pegar quem esta online. Mudar para true e deixar "link".
      result.active = false;

      return result;
    });

    return response;
  }

  public create(dto: AddCreatorDTO): Promise<Creators> {
    const created = new this.creatorModel(dto);
    return created.save();
  }
}
