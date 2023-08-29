import { IsString } from "class-validator";

export class UpdatePasswordDto {
    @IsString({ message: "Deve ser informada uma nova senha válida!" })
    newPassword: string;

    @IsString({ message: "Deve ser informada a antiga senha válida!" })
    lastPassword: string;
}
