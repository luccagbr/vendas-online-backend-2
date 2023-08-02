import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReturnUserDto } from './dto/return-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['addresses']
        })
    }

    async getUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })

        if(!user) {
            throw new NotFoundException('User id not found')
        }

        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltDrRounds = 10;

        const passwordCrypt = await hash(createUserDto.password, saltDrRounds);

        return this.userRepository.save({
            ...createUserDto,
            type_user: 1,
            password: passwordCrypt
        });
    }
}
