import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductService } from "../product.service";
import { ProductEntity } from "../entities/product.entity";
import { productMockEntity } from "../__mocks__/product.mock";
import { createProductMock } from "../__mocks__/create-product.mock";
import { CategoryService } from "../../category/category.service";
import { categoryMockEntity } from "../../category/__mocks__/category.mock";

describe("ProductService", () => {
    let service: ProductService;
    let productRepository: Repository<ProductEntity>;
    let categoryService: CategoryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: CategoryService,
                    useValue: {
                        findCategoryById: jest.fn().mockResolvedValue(categoryMockEntity),
                    },
                },
                {
                    provide: getRepositoryToken(ProductEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue([productMockEntity]),
                        save: jest.fn().mockResolvedValue(productMockEntity),
                    },
                },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
        categoryService = module.get<CategoryService>(CategoryService);
        productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
        expect(categoryService).toBeDefined();
        expect(productRepository).toBeDefined();
    });

    it("should return all products", async () => {
        const products = await service.findAll();

        expect(products).toEqual([productMockEntity]);
    });

    it("should return error if products empty", () => {
        jest.spyOn(productRepository, "find").mockResolvedValue([]);

        expect(service.findAll()).rejects.toThrowError();
    });

    it("should return error in exception", () => {
        jest.spyOn(productRepository, "find").mockRejectedValue(new Error());

        expect(service.findAll()).rejects.toThrowError();
    });

    it("should return product after insert in DB", async () => {
        const product = await service.createProduct(createProductMock);

        expect(product).toEqual(productMockEntity);
    });

    it("should return product after insert in DB", async () => {
        const product = await service.createProduct(createProductMock);

        expect(product).toEqual(productMockEntity);
    });

    it("should return product after insert in DB", async () => {
        jest.spyOn(categoryService, "findCategoryById").mockRejectedValue(new Error());

        expect(service.createProduct(createProductMock)).rejects.toThrowError();
    });
});
