import { CartEntity } from "src/cart/entities/cart.entity";
import { AddressEntity } from "../../address/entities/address.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    @Column({ name: "email", type: "varchar", nullable: false })
    email: string;

    @Column({ name: "phone", type: "varchar" })
    phone: string;

    @Column({ name: "cpf", type: "varchar", nullable: false })
    cpf: string;

    @Column({ name: "password", type: "varchar", nullable: false })
    password: string;

    @Column({ name: "type_user", type: "int", nullable: false })
    type_user: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany(() => AddressEntity, (address) => address.user)
    addresses?: AddressEntity[];

    @OneToMany(() => CartEntity, (cart_entity) => cart_entity.user)
    cart?: CartEntity[];
}
