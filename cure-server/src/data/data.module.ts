import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { EntrySchema } from "./schemas/entry.schema";
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'entries', schema: EntrySchema}])],
  controllers: [DataController],
  providers: [DataService]
})


export class DataModule {}
