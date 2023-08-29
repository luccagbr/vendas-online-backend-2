import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { CategoryService } from "../category/category.service";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService,
    ) {}

    async findAll(): Promise<ProductEntity[]> {
        const result = await this.productRepository.find();

        if (!result || result.length === 0) {
            throw new NotFoundException("Not found products");
        }

        return result;
    }

    async createProduct(params: CreateProductDto): Promise<ProductEntity> {
        await this.categoryService.findCategoryById(params.categoryId);

        return this.productRepository.save(params);
    }

    async findProductById(id: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: {
                id,
            },
        });

        if (!product) {
            throw new NotFoundException("Not found product id");
        }

        return product;
    }

    async deleteProduct(id: number): Promise<DeleteResult> {
        const product = await this.findProductById(id);

        return this.productRepository.delete(product.id);
    }

    async updateProduct(id_product: number, updateProduct: UpdateProductDto): Promise<ProductEntity> {
        const product = await this.findProductById(id_product);

        return this.productRepository.save({
            ...product,
            ...updateProduct,
        });
    }
}
