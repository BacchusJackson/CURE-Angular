import { Controller, Get } from '@nestjs/common';
import { DataService } from "./data.service";
import { CreateEntryDto } from "./dto/create-entry.dto";
import { Entry } from "./interfaces/entry.interface";

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) {}
    @Get()
    allEntries() {
        return this.dataService.findAll();
    }

}
