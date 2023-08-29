import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../user.service";
import { UserEntity } from "../entities/user.entity";
import { userMockEntity } from "../__mocks__/user.mock";
import { createUserMock } from "../__mocks__/create-user.mock";
import { updatePasswordInvalidMock, updatePasswordMock } from "../__mocks__/update-password.mock";

describe("UserService", () => {
    let service: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(userMockEntity),
                        save: jest.fn().mockResolvedValue(userMockEntity),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    it("should return user in findUserByEmail", async () => {
        const user = await service.findUserByEmail(userMockEntity.email);

        expect(user).toEqual(userMockEntity);
    });

    it("should return error in findUserByEmail", async () => {
        jest.spyOn(userRepository, "findOne").mockResolvedValue(undefined);

        expect(service.findUserByEmail(userMockEntity.email)).rejects.toThrowError();
    });

    it("should return error in findUserByEmail (error DB)", async () => {
        jest.spyOn(userRepository, "findOne").mockRejectedValueOnce(new Error());

        expect(service.findUserByEmail(userMockEntity.email)).rejects.toThrowError();
    });

    it("should return user in getUserById", async () => {
        const user = await service.getUserById(userMockEntity.id);

        expect(user).toEqual(userMockEntity);
    });

    it("should return error in getUserById (error DB)", async () => {
        jest.spyOn(userRepository, "findOne").mockRejectedValueOnce(new Error());

        expect(service.getUserById(userMockEntity.id)).rejects.toThrowError();
    });

    it("should return error in getUserById", async () => {
        jest.spyOn(userRepository, "findOne").mockResolvedValue(undefined);

        expect(service.getUserById(userMockEntity.id)).rejects.toThrowError();
    });

    it("should return user in getUserByIdUsingRelations", async () => {
        const user = await service.getUserByIdUsingRelations(userMockEntity.id);

        expect(user).toEqual(userMockEntity);
    });

    it("should return error if user exist", async () => {
        expect(service.createUser(createUserMock)).rejects.toThrowError();
    });

    it("should return user if user not exist", async () => {
        jest.spyOn(userRepository, "findOne").mockResolvedValue(undefined);

        const user = await service.createUser(createUserMock);

        expect(user).toEqual(userMockEntity);
    });

    it("should return user in update password", async () => {
        const user = await service.updatePasswordUser(updatePasswordMock, userMockEntity.id);

        expect(user).toEqual(userMockEntity);
    });

    it("should return invalid password in error", async () => {
        expect(service.updatePasswordUser(updatePasswordInvalidMock, userMockEntity.id)).rejects.toThrowError();
    });

    it("should return error user not exist", async () => {
        jest.spyOn(userRepository, "findOne").mockResolvedValue(undefined);

        expect(service.updatePasswordUser(updatePasswordInvalidMock, userMockEntity.id)).rejects.toThrowError();
    });
});
