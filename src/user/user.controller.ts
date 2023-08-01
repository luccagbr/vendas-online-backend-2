import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './interface/user.entity';
import { ReturnUserDto } from './dto/return-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUsers()).map((userEntity) => new ReturnUserDto(userEntity));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.userService.createUser(createUser);
    }
}