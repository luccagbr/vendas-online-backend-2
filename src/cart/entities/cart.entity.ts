import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("cart")
export class CartEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ name: "user_id", nullable: false, type: "integer" })
    userId: number;

    @Column({ name: "is_active", nullable: false, type: "boolean" })
    isActive: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany(() => CartProductEntity, (cart_product_entity) => cart_product_entity.cart)
    cartProduct?: CartProductEntity[];

    @ManyToOne(() => UserEntity, (user_entity) => user_entity.cart)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user?: UserEntity;
}
