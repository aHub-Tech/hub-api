import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum Plataform {
    Twitch = 'twitch',
    Youtube = 'youtube',
    Discord = 'discord',
    Linkedin = 'linkedin',
    Instagram = 'instagram'
  }

class EventLinkDTO {
    channel: Plataform;
    link: string;
}

export class AddEventsDTO {
  @IsString()
  photo: string;
  
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  eventDate: Date;

  @IsString()
  hosters: string[]

  @IsOptional()
  @IsEnum(Plataform)
  eventLink: EventLinkDTO;

  @IsOptional()
  @IsDate()
  createAt: Date;
}