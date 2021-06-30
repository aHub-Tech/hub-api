import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { EventLink, Plataform } from '../schemas/events.schema';

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
  hosters: string[];

  @IsOptional()
  @IsEnum(Plataform)
  eventLink: EventLink;
}
