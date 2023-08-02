import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Get('/:userId')
    async getUserById(@Param('userId') userId: string): Promise<UserEntity> {
        return this.userService.getUserById(Number(userId));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.userService.createUser(createUser);
    }
}