import { Test, TestingModule } from "@nestjs/testing";
import { categoryMockEntity } from "../__mocks__/category.mock";
import { Repository } from "typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CategoryService } from "../category.service";
import { createCategoryMock } from "../__mocks__/create-category.mock";

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
                        findOne: jest.fn().mockResolvedValue(categoryMockEntity),
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

    it("should return error if exist category name", async () => {
        expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
    });

    it("should return category after save", async () => {
        jest.spyOn(categoryRepository, "findOne").mockRejectedValue(undefined);

        const category = await service.createCategory(createCategoryMock);

        expect(category).toEqual(categoryMockEntity);
    });

    it("should return error in exception", async () => {
        jest.spyOn(categoryRepository, "save").mockRejectedValue(new Error());

        expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
    });

    it("should return category in find by name", async () => {
        const category = await service.findCategoryByName(categoryMockEntity.name);

        expect(category).toEqual(categoryMockEntity);
    });

    it("should return error if category find by name empty", async () => {
        jest.spyOn(categoryRepository, "findOne").mockResolvedValue(undefined);

        expect(service.findCategoryByName(categoryMockEntity.name)).rejects.toThrowError();
    });

    it("should return category in find by name", async () => {
        const category = await service.findCategoryByName(categoryMockEntity.name);

        expect(category).toEqual(categoryMockEntity);
    });

    it("should return one category by id", async () => {
        const category = await service.findCategoryById(categoryMockEntity.id);

        expect(category).toEqual(categoryMockEntity);
    });

    it("should return error not found category by id", async () => {
        jest.spyOn(categoryRepository, "findOne").mockResolvedValue(undefined);

        expect(service.findCategoryById(categoryMockEntity.id)).rejects.toThrowError();
    });
});
