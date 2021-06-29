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
    const response = await this.getId(id);

    return {
      displayName: response.display_name,
      twitchId: response._id,
      photo: response.logo,
    };
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

  public async getOnline(twitchId: string): Promise<boolean> {
    const url = `${this.config.URL_BASE}/streams/?channel=${twitchId}`;
    try {
      const response = await this.httpService
        .get(url, { headers: this.config.HEADERS_REQUEST })
        .toPromise();
      return response.data.streams.length > 0;
    } catch (error) {
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
