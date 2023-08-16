import { ReturnUserDto } from "../../user/dto/return-user.dto";

export class ReturnLogin {
    user: ReturnUserDto;
    access_token: string;
}
