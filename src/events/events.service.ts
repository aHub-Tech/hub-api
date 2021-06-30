import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from '@nestjs/mongoose';
import { Events, EventsFeatureProvider } from './schemas/events.schema';
import { AddEventsDTO } from './dto/add-events.dto';
@Injectable()
export class EventsService {
  constructor(
    @InjectModel(EventsFeatureProvider.name)
    private readonly eventsModel: ReturnModelType<typeof Events>, // @Inject(forwardRef(() => ApitwitchService))
  ) // private apiTwitchService: ApitwitchService
  {}

  public async create(dto: AddEventsDTO): Promise<Events> {
    const event = await this.eventsModel.create(dto);
    return event.save();
  }

  public findAll() {
    const today = new Date();
    return this.eventsModel.find({ eventDate: { $gte: today } });
  }
}
