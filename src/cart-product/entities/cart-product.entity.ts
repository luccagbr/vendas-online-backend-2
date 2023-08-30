import { CartEntity } from "src/cart/entities/cart.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("cart_product")
export class CartProductEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ name: "cart_id", type: "integer", nullable: false })
    cartId: number;

    @Column({ name: "product_id", type: "integer", nullable: false })
    productId: number;

    @Column({ name: "amount", type: "integer", nullable: false })
    amount: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => ProductEntity, (product_entity) => product_entity.cartProduct)
    @JoinColumn({ name: "product_id", referencedColumnName: "id" })
    product?: ProductEntity;

    @ManyToOne(() => CartEntity, (cart_entity) => cart_entity.cartProduct)
    @JoinColumn({ name: "cart_id", referencedColumnName: "id" })
    cart?: CartEntity;
}
