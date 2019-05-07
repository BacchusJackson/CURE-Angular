import { Injectable } from '@nestjs/common';
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>) {}
    
    
    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(username: string): Promise<User> {
        return await this.userModel.findOne({username: username})
    }

    async delete(username: string): Promise<User> {
        return await this.userModel.findOneAndDelete({username: username})
    }

    async createNewUser(user: CreateUserDto): Promise<User> {
        const candidateUser = new this.userModel(user);

        //edit defaults
        candidateUser.displayName = candidateUser.displayName || `${candidateUser.firstName} ${candidateUser.lastName}`;
        candidateUser.site = candidateUser.site || 'default';
        candidateUser.clinic = candidateUser.clinic || 'default';
        candidateUser.status = candidateUser.status || 'standard'

        // Hash the submitted password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(candidateUser.password, salt, (err, hash) => {
                if(err) throw err;
                // change the password and save
                candidateUser.password = hash;
                candidateUser.save();
            })
        })

        return await candidateUser
    }

    //fix update user... NOTES

    async updateUser(id: string, user: User): Promise<User> {
        return await this.userModel.updateOne({id: id}, user)
    }
}