import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs"
import { Entry } from "./interfaces/entry.interface";
import { CreateEntryDto } from "./dto/create-entry.dto";

// Talks to the mongoDB and returns information to the controller
@Injectable()
export class DataService {
    constructor(@InjectModel('Entries') private readonly entryModel:Model<Entry>) {}

    async findAll(): Promise<Entry[]> {
        return await this.entryModel.find()
    }

}
