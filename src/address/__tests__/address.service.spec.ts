import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CacheService } from "../../cache/cache.service";
import { AddressService } from "../address.service";
import { AddressEntity } from "../entities/address.entity";
import { addressMockEntity } from "../__mocks__/address.mock";
import { UserService } from "../../user/user.service";
import { userMockEntity } from "../../user/__mocks__/user.mock";
import { CityService } from "../../city/city.service";
import { cityMockEntity } from "../../city/__mocks__/city.mock";
import { createAddressMock } from "../__mocks__/create-address.mock";

describe("AddressService", () => {
    let service: AddressService;
    let userService: UserService;
    let cityService: CityService;
    let addressRepository: Repository<AddressEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddressService,
                {
                    provide: UserService,
                    useValue: {
                        getUserById: jest.fn().mockResolvedValue(userMockEntity),
                    },
                },
                {
                    provide: CityService,
                    useValue: {
                        getCityById: jest.fn().mockResolvedValue(cityMockEntity),
                    },
                },
                {
                    provide: getRepositoryToken(AddressEntity),
                    useValue: {
                        save: jest.fn().mockResolvedValue(addressMockEntity),
                        find: jest.fn().mockResolvedValue([addressMockEntity]),
                    },
                },
            ],
        }).compile();

        service = module.get<AddressService>(AddressService);
        userService = module.get<UserService>(UserService);
        cityService = module.get<CityService>(CityService);
        addressRepository = module.get<Repository<AddressEntity>>(getRepositoryToken(AddressEntity));
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
        expect(cityService).toBeDefined();

        expect(addressRepository).toBeDefined();
    });

    it("should return address after save", async () => {
        const address = await service.createAddress(createAddressMock, userMockEntity.id);

        expect(address).toEqual(addressMockEntity);
    });

    it("should return error if exception in userService", async () => {
        jest.spyOn(userService, "getUserById").mockRejectedValueOnce(new Error());

        expect(service.createAddress(createAddressMock, userMockEntity.id)).rejects.toThrowError();
    });

    it("should return error if exception in cityService", async () => {
        jest.spyOn(cityService, "getCityById").mockRejectedValueOnce(new Error());

        expect(service.createAddress(createAddressMock, userMockEntity.id)).rejects.toThrowError();
    });

    it("should return all addresses to user", async () => {
        const addresses = await service.findAddressByUserId(userMockEntity.id);

        expect(addresses).toEqual([addressMockEntity]);
    });

    it("should return not found if not address registred", async () => {
        jest.spyOn(addressRepository, "find").mockResolvedValue(undefined);

        expect(service.findAddressByUserId(userMockEntity.id)).rejects.toThrowError();
    });
});
