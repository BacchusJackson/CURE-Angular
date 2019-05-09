import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import config from './config/keys'

@Module({
  imports: [UsersModule ,MongooseModule.forRoot(config.localDatabase)],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService]
})

export class AppModule {}