import { AddressEntity } from "src/address/entities/address.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'city' })
export class CityEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'state_id', type: 'integer', nullable: false})
    stateId: number;

    @Column({ name: 'name', type: 'varchar', nullable: false})
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => AddressEntity, (address) => address.city)
    addresses: AddressEntity[];
}