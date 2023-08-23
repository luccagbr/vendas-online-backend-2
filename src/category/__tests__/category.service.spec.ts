import { Test, TestingModule } from "@nestjs/testing";
import { categoryMockEntity } from "../__mocks__/category.mock";
import { Repository } from "typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CategoryService } from "../category.service";

describe("CategoryService", () => {
    let service: CategoryService;
    let categoryRepository: Repository<CategoryEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
                {
                    provide: getRepositoryToken(CategoryEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue([categoryMockEntity]),
                        save: jest.fn().mockResolvedValue(categoryMockEntity),
                    },
                },
            ],
        }).compile();

        service = module.get<CategoryService>(CategoryService);
        categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
        expect(categoryRepository).toBeDefined();
    });

    it("should return list category", async () => {
        const categories = await service.findAllCategories();

        expect(categories).toEqual([categoryMockEntity]);
    });

    it("should return error list category empty", async () => {
        jest.spyOn(categoryRepository, "find").mockResolvedValue([]);

        expect(service.findAllCategories()).rejects.toThrowError();
    });

    it("should return error list category exception", async () => {
        jest.spyOn(categoryRepository, "find").mockRejectedValue(new Error());

        expect(service.findAllCategories()).rejects.toThrowError();
    });
});
