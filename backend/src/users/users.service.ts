import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        try {
            const createdUser = new this.userModel(createUserDto);
            await createdUser.save();
            return createdUser;

        } catch (error) {
            console.log('----->', error)
            return {
                error
            }
        }

    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async findById(id: string): Promise<any> {
        try {
            const result = await this.userModel.findById(id);


            return result;
        } catch (error) {
            return { error }
        }
    }

    async findByOne(email: string): Promise<User> {
        try {
            const result = await this.userModel.findOne({ email: email }).exec();
            return result;
        } catch (error) {
            console.log('usersService-findByOne: ', error);
            return null;
        }
    }

    async deleteById(id: string): Promise<any> {

        try {
            const result = await this.userModel.findByIdAndRemove(id).exec();
            return result
        } catch (error) {
            return { error }
        }
    }
}
