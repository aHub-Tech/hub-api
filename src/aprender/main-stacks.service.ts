import { Injectable } from '@nestjs/common';
import { IMainStacks } from './main-stacks.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { MainStack, MainStacksFeatureProvider } from './schemas/main-stacks.schema';

@Injectable()
export class MainStacksService {
    constructor(
        @InjectModel(MainStacksFeatureProvider.name)
        private readonly mainStackModel: ReturnModelType<typeof MainStack>,
    ) {}
    public async getMainStacks(): Promise<IMainStacks[]> {
        const mainStacks = await this.mainStackModel.find({}).lean();

        return mainStacks.map(mainStack => {
            return {
                ...mainStack,
                subjects: mainStack.subjects.length,
            };
        });
    }

    public async createMainStack(mainStack: IMainStacks) {
        const created = new this.mainStackModel(mainStack);
        await created.save();

        return created;
    }
}
