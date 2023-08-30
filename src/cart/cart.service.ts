import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartEntity } from "./entities/cart.entity";
import { Repository } from "typeorm";
import { insertCartDto } from "./dtos/insert-cart.dto";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
    ) {}

    async verifyActiveCart(userId: number): Promise<CartEntity> {
        const cart = await this.cartRepository
            .createQueryBuilder("ct")
            .where("ct.user_id = :userId", {
                userId,
            })
            .getOne();

        if (!cart) {
            throw new NotFoundException("Cart active not found.");
        }

        return cart;
    }

    async createCart(userId: number): Promise<CartEntity> {
        return await this.cartRepository.save({
            isActive: true,
            userId,
        });
    }

    async insertProductInCart(insertCart: insertCartDto, userId: number): Promise<CartEntity> {
        const cart = await this.verifyActiveCart(userId).catch(async () => this.createCart(userId));

        return cart;
    }
}
