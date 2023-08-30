import { IsNumber } from "class-validator";

export class insertCartDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    amount: number;
}
