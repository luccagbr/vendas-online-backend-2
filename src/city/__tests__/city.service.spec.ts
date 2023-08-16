import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CityService } from "../city.service";
import { CityEntity } from "../entities/city.entity";
import { cityMockEntity } from "../__mocks__/city.mock";
import { CacheService } from "../../cache/cache.service";

describe("CityService", () => {
    let service: CityService;
    let cityRepository: Repository<CityEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CityService,
                {
                    provide: CacheService,
                    useValue: {
                        getCache: jest.fn().mockResolvedValue([cityMockEntity]),
                    },
                },
                {
                    provide: getRepositoryToken(CityEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(cityMockEntity),
                    },
                },
            ],
        }).compile();

        service = module.get<CityService>(CityService);
        cityRepository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity));
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
        expect(cityRepository).toBeDefined();
    });

    it("should return city register by id", async () => {
        const city = await service.getCityById(cityMockEntity.id);

        expect(city).toEqual(cityMockEntity);
    });

    it("should return error find one not found", async () => {
        jest.spyOn(cityRepository, "findOne").mockResolvedValue(undefined);

        expect(service.getCityById(cityMockEntity.id)).rejects.toThrowError();
    });

    it("should return Cities in getAllCitiesByStateId", async () => {
        const city = await service.getAllCitiesByStateId(cityMockEntity.stateId);

        expect(city).toEqual([cityMockEntity]);
    });
});
