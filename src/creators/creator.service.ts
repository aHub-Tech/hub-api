import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AddCreatorDTO } from './dto';
import { Creators, CreatorFeatureProvider } from './schemas/creator.schema';
import { ApitwitchService } from 'src/api-twitch/apitwitch.service';

@Injectable()
export class CreatorService {
  constructor(
    @InjectModel(CreatorFeatureProvider.name)
    private readonly creatorModel: ReturnModelType<typeof Creators>,
    @Inject(forwardRef(() => ApitwitchService))
    private apiTwitchService: ApitwitchService
  ) {}

  public async findAll(status: boolean = true): Promise<any> {
    const creators = await this.creatorModel.find({ status }).lean();

    const response = await Promise.all(creators.map(async (creator) => {
      const { password, email, ...result } = creator;

      result.active = await this.apiTwitchService.getOnline(creator.twitchId);

      return result;
    }));

    return response;
  }

  public async create(dto: AddCreatorDTO): Promise<Creators> {
    const twitch = dto.socials.find(x => x.twitch).twitch.split('/');
    const nameTwitch = twitch[twitch.length -1 ];
    const dadosTwitch = await this.apiTwitchService.getTwitchDetails(nameTwitch);

    const created = new this.creatorModel({...dto, ...dadosTwitch});
    return created.save();
  }

}
