import { ProductEntity } from "../../product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "category" })
export class CategoryEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany(() => ProductEntity, (product_entity) => product_entity.category)
    product?: ProductEntity[];
}
