import { stateMockEntity } from "../../state/__mocks__/state.mock";
import { CityEntity } from "../entities/city.entity";

export const cityMockEntity: CityEntity = {
    createdAt: new Date(),
    id: 234,
    name: "caratinga",
    stateId: stateMockEntity.id,
    updatedAt: new Date(),
};
