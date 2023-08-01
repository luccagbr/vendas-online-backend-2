import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './interface/user.entity';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async getAllUsers(): Promise<UserEntity[] | string> {
        return this.userService.getAllUsers();
    }

    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.userService.createUser(createUser);
    }
}