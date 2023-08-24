import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { CategoryService } from "../category/category.service";

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
}
