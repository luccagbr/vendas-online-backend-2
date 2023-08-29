import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { ReturnUserDto } from "./dto/return-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UserId } from "src/decorators/user-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { UserType } from "./enum/user-type.enum";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(UserType.Admin)
    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUsers()).map((userEntity) => new ReturnUserDto(userEntity));
    }

    @Roles(UserType.Admin)
    @Get("/:userId")
    async getUserById(@Param("userId") userId: string): Promise<UserEntity> {
        return await this.userService.getUserById(Number(userId));
    }

    @Get("/relations/:userId")
    async getUserByIdUsingRelations(@Param("userId") userId: string): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(Number(userId)));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.userService.createUser(createUser);
    }

    @Roles(UserType.Admin, UserType.User)
    @Patch()
    @UsePipes(ValidationPipe)
    async updatePasswordUser(@UserId() userId: number, @Body() updatePassword: UpdatePasswordDto): Promise<UserEntity> {
        return await this.userService.updatePasswordUser(updatePassword, Number(userId));
    }
}
