import { cityMockEntity } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entities/address.entity";
import { userMockEntity } from "../../user/__mocks__/user.mock";

export const addressMockEntity: AddressEntity = {
    id: 342,
    cityId: cityMockEntity.id,
    userId: userMockEntity.id,
    cep: "35300333",
    complement: "2",
    createdAt: new Date(),
    numberAddress: 22,
    updatedAt: new Date(),
};
