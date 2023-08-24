import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ReturnCategoryDto } from "./dto/return-category,dto";
import { Roles } from "src/decorators/roles.decorator";
import { UserType } from "src/user/enum/user-type.enum";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryEntity } from "./entities/category.entity";

@Roles(UserType.Admin, UserType.User)
@Controller("category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        return (await this.categoryService.findAllCategories()).map((category) => {
            return new ReturnCategoryDto(category);
        });
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(@Body() createCategory: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoryService.createCategory(createCategory);
    }
}
