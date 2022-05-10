import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMainStackDTO } from './dto/main-stack.dto';
import { MainStacksService } from './main-stacks.service';

const _aprender = 'aprender';

@Controller(_aprender)
export class AprenderController {
    constructor(private readonly mainStacksService: MainStacksService) {}
    @Get('main-stacks')
    public getMainStacks() {
        return this.mainStacksService.getMainStacks();
    }

    @Post('main-stacks')
    public createMainStack(
        @Body() mainStack: CreateMainStackDTO
        ) {
        return this.mainStacksService.createMainStack(mainStack);
    }
}
