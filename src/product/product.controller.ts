import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Roles } from "src/decorators/roles.decorator";
import { UserType } from "src/user/enum/user-type.enum";
import { ProductEntity } from "./entities/product.entity";
import { ReturnProductDto } from "./dto/return-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";

@Roles(UserType.Admin, UserType.User)
@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll(): Promise<ReturnProductDto[]> {
        return (await this.productService.findAll()).map((product) => {
            return new ReturnProductDto(product);
        });
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProduct: CreateProductDto): Promise<ProductEntity> {
        return this.productService.createProduct(createProduct);
    }
}