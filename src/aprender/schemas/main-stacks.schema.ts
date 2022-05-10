import { buildSchema, getModelForClass, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

export class Info {
    @prop({ required: true })
    quote: string;

    @prop({ required: true })
    author: string;
}

export class MainStack {
    @prop({ required: true })
    public baseColor: string;

    @prop({ required: false })
    public source?: string;

    @prop({ required: true })
    public title: string[];

    @prop({ required: true })
    public info: Info;

    @prop({ required: false, default: () => [] })
    public subjects?: ObjectId[];
}

const MainStackModel = getModelForClass(MainStack);

const MainStackschema = buildSchema(MainStack, { versionKey: false });

export const MainStacksFeatureProvider = {
    name: 'MainStack',
    collection: 'MainStacks',
    model: MainStackModel,
    schema: MainStackschema,
};
