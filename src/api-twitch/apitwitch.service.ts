import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

interface IResponseTwitchDetails {
  display_name: string;
  _id: number;
  logo: string;
}

@Injectable()
export class ApitwitchService {
  constructor(private httpService: HttpService) {}

  private config = {
    URL_BASE: 'https://api.twitch.tv/kraken',
    HEADERS_REQUEST: {
      'Client-ID': 'tjs9gqghzdfuuycllhiq8erjp4mdk9',
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  };

  public async getTwitchDetails(id: string) {
    const response = await this.getPhotos(id);

    const result = response.map((user) => {
      return {
        displayName: user?.display_name,
        twitchId: user?._id,
        photo: user?.logo,
      };
    });

    return result;
  }

  public async getPhotos(twitchIds: string) {
    const url = `${this.config.URL_BASE}/users?login=${twitchIds}`;

    try {
      const response = await this.httpService
        .get(url, { headers: this.config.HEADERS_REQUEST })
        .toPromise();
      return response.data.users;
    } catch (error) {
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }

  private async getId(name: string): Promise<IResponseTwitchDetails> {
    const url = `${this.config.URL_BASE}/users?login=${name}`;
    try {
      const response = await this.httpService
        .get(url, { headers: this.config.HEADERS_REQUEST })
        .toPromise();
      return response.data.users[0];
    } catch (error) {
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }

  public async getOnline(twitchId: string): Promise<any> {
    const url = `${this.config.URL_BASE}/streams/?channel=${twitchId}`;
    try {
      const response = await this.httpService
        .get(url, { headers: this.config.HEADERS_REQUEST })
        .toPromise();
      const data = response.data.streams;

      return data.map(info => info.channel._id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
