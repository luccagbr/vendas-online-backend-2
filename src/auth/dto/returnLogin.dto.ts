import { ReturnUserDto } from 'src/user/dto/return-user.dto';

export class ReturnLogin {
  user: ReturnUserDto;
  access_token: string;
}
