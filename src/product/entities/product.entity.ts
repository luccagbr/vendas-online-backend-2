import { CategoryEntity } from "../../category/entities/category.entity";
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
import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";

@Entity({ name: "product" })
export class ProductEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ name: "category_id", type: "integer" })
    categoryId: number;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "price", type: "float" })
    price: number;

    @Column({ name: "image", type: "varchar" })
    image: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, (category_entity) => category_entity.product)
    @JoinColumn({ name: "category_id", referencedColumnName: "id" })
    category: CategoryEntity;

    @OneToMany(() => CartProductEntity, (cart_product_entity) => cart_product_entity.product)
    cartProduct?: CartProductEntity[];
}
