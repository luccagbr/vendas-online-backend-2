import { categoryMockEntity } from "../../category/__mocks__/category.mock";
import { UpdateProductDto } from "../dto/update-product.dto";

export const updateProductMock: UpdateProductDto = {
    categoryId: categoryMockEntity.id,
    name: "fdsjkfghdksjhgekr",
    price: 99.9,
    image: "dfgr728349yhjdskg",
};
