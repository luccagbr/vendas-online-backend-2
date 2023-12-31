import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ReturnLogin } from "./dto/returnLogin.dto";
import { ReturnUserDto } from "../user/dto/return-user.dto";
import { LoginPayload } from "./dto/loginPayload.dto";
import { validatePassword } from "../utils/password";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        const user: UserEntity = await this.userService.findUserByEmail(loginDto.email).catch(() => undefined);

        const isMatch = await validatePassword(loginDto.password, user?.password || "");

        if (!user || !isMatch) {
            throw new NotFoundException("Email or password not found");
        }

        return {
            access_token: this.jwtService.sign({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user),
        };
    }
}
