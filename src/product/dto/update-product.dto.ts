import { IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
    @IsNumber()
    categoryId: number;

    @IsString({ message: "Deve ser informada um nome válido" })
    name: string;

    @IsNumber()
    price: number;

    @IsString({ message: "Deve ser informada uma imagem válida" })
    image: string;
}
