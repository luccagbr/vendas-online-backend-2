import { cityMockEntity } from "../../city/__mocks__/city.mock";
import { CreateAddressDto } from "../dto/create-address.dto";

export const createAddressMock: CreateAddressDto = {
    cep: "35300333",
    cityId: cityMockEntity.id,
    complement: "32",
    numberAddress: 342,
};
