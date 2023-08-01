import { UserEntity } from "../interface/user.entity";

export class ReturnUserDto {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.cpf = userEntity.cpf;
        this.email = userEntity.email;
        this.phone = userEntity.phone;
    }
}