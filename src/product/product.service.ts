import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    async findAll(): Promise<ProductEntity[]> {
        const result = await this.productRepository.find();

        if (!result || result.length === 0) {
            throw new NotFoundException("Not found products");
        }

        return result;
    }
}
