import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Roles } from "src/decorators/roles.decorator";
import { UserType } from "src/user/enum/user-type.enum";
import { ProductEntity } from "./entities/product.entity";
import { ReturnProductDto } from "./dto/return-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { DeleteResult } from "typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";

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

    @Roles(UserType.Admin)
    @Delete("/:id_product")
    async deleteProduct(@Param("id_product") id_product: string): Promise<DeleteResult> {
        return await this.productService.deleteProduct(Number(id_product));
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Put("/:id_product")
    async updateProduct(
        @Param("id_product") id_product: string,
        @Body() params: UpdateProductDto,
    ): Promise<ProductEntity> {
        return this.productService.updateProduct(Number(id_product), params);
    }
}
