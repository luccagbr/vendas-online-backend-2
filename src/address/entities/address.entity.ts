import { CityEntity } from "../../city/entities/city.entity";
import { UserEntity } from "../../user/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "address" })
export class AddressEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ name: "user_id", type: "integer", nullable: false })
    userId: number;

    @Column({ name: "complement", type: "varchar", nullable: true })
    complement: string;

    @Column({ name: "number", type: "integer", nullable: false })
    numberAddress: number;

    @Column({ name: "cep", type: "varchar", nullable: false })
    cep: string;

    @Column({ name: "city_id", type: "integer", nullable: false })
    cityId: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.addresses)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user?: UserEntity;

    @ManyToOne(() => CityEntity, (city) => city.addresses)
    @JoinColumn({ name: "city_id", referencedColumnName: "id" })
    city?: CityEntity;
}
