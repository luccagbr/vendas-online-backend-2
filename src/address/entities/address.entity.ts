import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'address'})
export class AddressEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'user_id', type: 'integer', nullable: false })
    userId: number;

    @Column({ name: 'complement', type: 'varchar' })
    complement: string;

    @Column({ name: 'number', type: 'integer', nullable: false })
    numberAddress: number;

    @Column({ name: 'cep', type: 'varchar', nullable: false })
    cep: string;

    @Column({ name: 'city_id', type: 'integer', nullable: false })
    cityId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}