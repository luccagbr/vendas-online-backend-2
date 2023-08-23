import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryEntity } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();

        if (!categories || categories.length === 0) {
            throw new NotFoundException("Categories empty");
        }

        return categories;
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                name,
            },
        });

        if (!category) {
            throw new NotFoundException(`Category name: ${name} not found`);
        }
        return category;
    }

    async createCategory(createCategory: CreateCategoryDto) {
        const category = await this.findCategoryByName(createCategory.name).catch(() => undefined);

        if (category) {
            throw new BadRequestException("There are category name records");
        }

        return await this.categoryRepository.save(createCategory);
    }
}
