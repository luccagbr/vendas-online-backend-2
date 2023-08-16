import { AddressEntity } from "../../address/entities/address.entity";
import { StateEntity } from "../../state/entities/state.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "city" })
export class CityEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ name: "state_id", type: "integer", nullable: false })
    stateId: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @CreateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany(() => AddressEntity, (address) => address.city)
    addresses?: AddressEntity[];

    @ManyToOne(() => StateEntity, (state) => state.cities)
    @JoinColumn({ name: "state_id", referencedColumnName: "id" })
    state?: StateEntity;
}
