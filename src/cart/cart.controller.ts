import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Roles } from "src/decorators/roles.decorator";
import { UserType } from "src/user/enum/user-type.enum";
import { CartService } from "./cart.service";
import { CartEntity } from "./entities/cart.entity";
import { insertCartDto } from "./dtos/insert-cart.dto";
import { UserId } from "src/decorators/user-id.decorator";

@Roles(UserType.User, UserType.Admin)
@Controller("cart")
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createCart(@Body() insertCart: insertCartDto, @UserId() userId: number): Promise<CartEntity> {
        return await this.cartService.insertProductInCart(insertCart, userId);
    }
}
