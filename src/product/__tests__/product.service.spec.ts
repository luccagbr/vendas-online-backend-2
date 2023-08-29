import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductService } from "../product.service";
import { ProductEntity } from "../entities/product.entity";
import { productMockEntity } from "../__mocks__/product.mock";
import { createProductMock } from "../__mocks__/create-product.mock";
import { CategoryService } from "../../category/category.service";
import { categoryMockEntity } from "../../category/__mocks__/category.mock";
import { returnDeleteMock } from "../../__mocks__/return-delete.mock";
import { updateProductMock } from "../__mocks__/update-product.mock";

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
                        findOne: jest.fn().mockResolvedValue(productMockEntity),
                        save: jest.fn().mockResolvedValue(productMockEntity),
                        delete: jest.fn().mockResolvedValue(returnDeleteMock),
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

    it("should return product in find by id", async () => {
        const product = await service.findProductById(productMockEntity.id);

        expect(product).toEqual(productMockEntity);
    });

    it("should return error find product id not found", async () => {
        jest.spyOn(productRepository, "findOne").mockResolvedValue(undefined);

        expect(service.findProductById(productMockEntity.id)).rejects.toThrow();
    });

    it("should return deleted true in delete product", async () => {
        const deleted = await service.deleteProduct(productMockEntity.id);

        expect(deleted).toEqual(returnDeleteMock);
    });

    it("should return product after updated", async () => {
        const product = await service.updateProduct(productMockEntity.id, updateProductMock);

        expect(product).toEqual(productMockEntity);
    });

    it("should return error product after updated", async () => {
        jest.spyOn(productRepository, "save").mockRejectedValue(new Error());

        expect(service.updateProduct(productMockEntity.id, updateProductMock)).rejects.toThrow();
    });
});
