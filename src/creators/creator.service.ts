import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
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
    const creators = await this.creatorModel
      .find({ status })
      .sort({ displayName: 1 })
      .lean();
    const displayNames = creators.map((x) => x.displayName);
    const twitchIds = creators.map((x) => x.twitchId);

    const updateOnline = await this.apiTwitchService.getOnline(
      twitchIds.join(','),
    );

    const updatePhotos = await this.apiTwitchService.getTwitchDetails(
      displayNames.join(','),
    );
    const response = await Promise.all(
      creators.map(async (creator) => {
        const data = updatePhotos.find((x) => x.twitchId === creator.twitchId);

        // Update the creator info
        this.updateOne(data);

        const { password, email, _id, twitchId, name, ...result } = creator;
        result.online = !!updateOnline.find(
          (user) => user.toString() === creator.twitchId,
        );
        result.displayName = data.displayName;
        result.photo = data.photo;

        return result;
      }),
    );

    return response;
  }

  public async findOne(email: string) {
    return this.creatorModel.findOne({ email }).lean();
  }

  public async updateOne(dto: any) {
    return this.creatorModel.updateOne(
      { twitchId: dto.twitchId },
      { photo: dto.photo, displayName: dto.displayName },
    );
  }

  public async create(dto: AddCreatorDTO): Promise<Creators> {
    const user = await this.findOne(dto.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const twitch = dto.socials
      .find((x) => x.social === SocialType.Twitch)
      .link.split('/');
    const nameTwitch = twitch[twitch.length - 1];
    const dadosTwitch = await this.apiTwitchService.getTwitchDetails(
      nameTwitch,
    );
    dto.password = await bcrypt.hash(dto.password, 10);
    const created = new this.creatorModel({ ...dto, ...dadosTwitch[0] });
    return created.save();
  }
}
