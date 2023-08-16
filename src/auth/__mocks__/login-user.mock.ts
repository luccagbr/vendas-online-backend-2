import { userMockEntity } from "../../user/__mocks__/user.mock";
import { LoginDto } from "../dto/login.dto";

export const loginUserMock: LoginDto = {
    email: userMockEntity.email,
    password: "abc",
};
