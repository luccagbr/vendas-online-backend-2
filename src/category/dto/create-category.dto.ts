import { IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: "Deve ser informado um nome válido" })
    name: string;
}
