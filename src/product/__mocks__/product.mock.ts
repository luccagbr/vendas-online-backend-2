import { categoryMockEntity } from "../../category/__mocks__/category.mock";

export const productMockEntity = {
    id: 1,
    categoryId: categoryMockEntity.id,
    name: "Produto",
    price: 100.5,
    image: "www.google.com",
    createdAt: new Date(),
    updatedAt: new Date(),
};
