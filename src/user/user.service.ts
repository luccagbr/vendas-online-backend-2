import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './interface/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getAllUsers(): Promise<UserEntity[] | string> {
        return this.userRepository.find();
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltDrRounds = 10;

        const passwordCrypt = await hash(createUserDto.password, saltDrRounds);

        return this.userRepository.save({
            ...createUserDto,
            password: passwordCrypt
        });;
    }
}
