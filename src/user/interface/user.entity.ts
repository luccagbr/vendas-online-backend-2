import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: "name",type: 'varchar', nullable: false })
    name: string;
  
    @Column({ name: "email", type: 'varchar', nullable: false })
    email: string;
    
    @Column({ name: "phone", type: 'varchar'})
    phone: string;
    
    @Column({ name: "cpf", type: 'varchar', nullable: false })
    cpf: string;

    @Column({ name: "password", type: 'varchar', nullable: false })
    password: string;
}