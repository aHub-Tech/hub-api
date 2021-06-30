import { buildSchema, getModelForClass, prop } from '@typegoose/typegoose';

export enum Plataform {
  Twitch = 'twitch',
  Youtube = 'youtube',
  Discord = 'discord',
  Linkedin = 'linkedin',
  Instagram = 'instagram'
}

export class EventLink{
  @prop({ required: true })
  public channel: Plataform;

  @prop({ required: true })
  public link: string;
}

export class Events {
  @prop({ required: true })
  public photo: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public eventDate: Date;

  @prop({ required: true })
  public hosters: string[];

  @prop({ required: false })
  public eventLink: EventLink[];

  @prop({ required: false, default: () => new Date() })
  public createAt: Date;

  @prop({ required: false, default: () => true })
  public status: boolean;

  public active?: boolean;
}

const EventsModel = getModelForClass(Events);

const EventsSchema = buildSchema(Events, { versionKey: false });

export const EventsFeatureProvider = {
  name: 'Events',
  collection: 'Events',
  model: EventsModel,
  schema: EventsSchema,
};
