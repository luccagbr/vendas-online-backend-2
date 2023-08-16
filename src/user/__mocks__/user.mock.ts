import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userMockEntity: UserEntity = {
    cpf: "83427492374",
    createdAt: new Date(),
    email: "email@gmail.com",
    id: 234,
    name: "Teste",
    password: "testesenha",
    phone: "33992211111",
    type_user: UserType.User,
    updatedAt: new Date(),
};
