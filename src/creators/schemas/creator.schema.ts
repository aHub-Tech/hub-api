import { buildSchema, getModelForClass, prop } from '@typegoose/typegoose';

interface ISocials {
  [key: string]: string;
}

export class Creators {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public email: string;

  @prop({ required: false })
  public password: string;

  @prop({ required: false })
  public tags: string[];

  @prop({ required: false })
  public socials: ISocials[];

  @prop({ required: false })
  public photo: string;

  @prop({ required: false, default: () => new Date() })
  public createAt: Date;

  @prop({ required: false, default: () => true })
  public status: boolean;

  public active?: boolean;
}

const CreatorsModel = getModelForClass(Creators);

const CreatorSchema = buildSchema(Creators, { versionKey: false });

export const CreatorFeatureProvider = {
  name: 'Creator',
  collection: 'Creators',
  model: CreatorsModel,
  schema: CreatorSchema,
};
