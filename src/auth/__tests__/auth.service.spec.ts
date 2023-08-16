import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { UserService } from "../../user/user.service";
import { userMockEntity } from "../../user/__mocks__/user.mock";
import { JwtService } from "@nestjs/jwt";
import { jwtMock } from "../__mocks__/jwt.mock";
import { loginUserMock } from "../__mocks__/login-user.mock";
import { ReturnUserDto } from "../../user/dto/return-user.dto";

describe("AuthService", () => {
    let service: AuthService;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        findUserByEmail: jest.fn().mockResolvedValue(userMockEntity),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: () => jwtMock,
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
    });

    it("should return user if password and email valid", async () => {
        const user = await service.login(loginUserMock);

        expect(user).toEqual({
            access_token: jwtMock,
            user: new ReturnUserDto(userMockEntity),
        });
    });

    it("should return user if password invalid and email valid", async () => {
        expect(service.login({ ...loginUserMock, password: "342" })).rejects.toThrowError();
    });

    it("should return user if email not exist", async () => {
        jest.spyOn(userService, "findUserByEmail").mockResolvedValue(undefined);

        expect(service.login(loginUserMock)).rejects.toThrowError();
    });

    it("should return error in UserService", async () => {
        jest.spyOn(userService, "findUserByEmail").mockRejectedValue(new Error());

        expect(service.login(loginUserMock)).rejects.toThrowError();
    });
});
