import { CategoryEntity } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, (category_entity) => category_entity.product)
    @JoinColumn({ name: "category_id", referencedColumnName: "id" })
    category: CategoryEntity;
}
