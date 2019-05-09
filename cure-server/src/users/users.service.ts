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

        // Hash the user's inputted password
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(candidateUser.password, salt);

        candidateUser.password = hash;
        return await candidateUser.save();
    }

    async updateUser(id: string, user: User): Promise<User> {
        //if the new information includes a password
        if(user.password) {
            // Hash the user's inputted password
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(user.password, salt);
            
            //store the password in the user object
            user.password = hash;
        }

        return await this.userModel.updateOne({_id:id}, user)

    }
}