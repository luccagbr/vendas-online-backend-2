import { Injectable, NotFoundException, BadGatewayException, BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { hash } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserType } from "./enum/user-type.enum";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { createPasswordHashed, validatePassword } from "../utils/password";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException("User id not found");
        }

        return user;
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                addresses: {
                    city: {
                        state: true,
                    },
                },
            },
        });
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw new NotFoundException("Email not found");
        }

        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.findUserByEmail(createUserDto.email).catch(() => undefined);

        if (user) {
            throw new BadGatewayException("email registered in system");
        }

        const passwordCrypt = await createPasswordHashed(createUserDto.password);

        return this.userRepository.save({
            ...createUserDto,
            type_user: UserType.User,
            password: passwordCrypt,
        });
    }

    async updatePasswordUser(updatePassword: UpdatePasswordDto, userId: number): Promise<UserEntity> {
        const user = await this.getUserById(userId);

        const passwordHashed = await createPasswordHashed(updatePassword.newPassword);

        const isMatch = await validatePassword(updatePassword.lastPassword, user.password || "");

        if (!isMatch) {
            throw new BadRequestException("Last password invalid");
        }

        return this.userRepository.save({
            ...user,
            password: passwordHashed,
        });
    }
}
