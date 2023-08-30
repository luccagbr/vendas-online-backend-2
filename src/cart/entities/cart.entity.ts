import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cart")
export class CartEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ name: "name", nullable: false, type: "integer" })
    userId: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @CreateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
