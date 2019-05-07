import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from './interfaces/user.interface';
import { CreateUserDto } from "./dto/create-user.dto";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('allUsers')
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':username')
    findOne(@Param('username') username): Promise<User> {
        return this.usersService.findOne(username)
    }

    @Delete(':username')
    delete(@Param('username') username): Promise<User> {
        return this.usersService.delete(username);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createNewUser(createUserDto)
    }

    @Put(':id')
    update(@Body() updateUserDto: CreateUserDto, @Param('id') id): Promise<User> {
        return this.usersService.updateUser(id, updateUserDto)
    }
}