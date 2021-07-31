import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApitwitchService } from 'src/api-twitch/apitwitch.service';
import { AddCreatorDTO } from './dto';
import { CreatorFeatureProvider, Creators } from './schemas/creator.schema';
import * as bcrypt from 'bcrypt';

export enum SocialType {
  Twitch = 'twitch',
  Youtube = 'youtube',
  Linkedin = 'linkedin',
  Instagram = 'instagram',
}

@Injectable()
export class CreatorService {
  constructor(
    @InjectModel(CreatorFeatureProvider.name)
    private readonly creatorModel: ReturnModelType<typeof Creators>,
    @Inject(forwardRef(() => ApitwitchService))
    private apiTwitchService: ApitwitchService,
  ) {}

  public async findAll(status: boolean = true): Promise<any> {
    const creators = await this.creatorModel.find({ status }).lean();

    const response = await Promise.all(
      creators.map(async (creator) => {
        const { password, email, _id, twitchId, name,  ...result } = creator;

        result.online = await this.apiTwitchService.getOnline(creator.twitchId);

        return result;
      }),
    );

    return response;
  }

  public async findOne(email: string) {
    return this.creatorModel.findOne({ email }).lean();
  }

  public async create(dto: AddCreatorDTO): Promise<Creators> {
    const user = await this.findOne(dto.email);
    if (user) {
      // TODO: FIX ERRORS.
      throw Promise.reject(new Error('User already exists'));
    }

    const twitch = dto.socials.find((x) => x.social === SocialType.Twitch).link.split('/');
    const nameTwitch = twitch[twitch.length - 1];
    const dadosTwitch = await this.apiTwitchService.getTwitchDetails(
      nameTwitch,
    );
    dto.password = await bcrypt.hash(dto.password, 10);
    const created = new this.creatorModel({ ...dto, ...dadosTwitch });
    return created.save();
  }
}
