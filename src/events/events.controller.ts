import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddEventsDTO } from './dto';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    findAll() {
        return this.eventsService.findAll();
    }

    @Post()
    async create(@Body() dto: AddEventsDTO): Promise<Events> {
        return this.eventsService.create(dto);
    }
}
