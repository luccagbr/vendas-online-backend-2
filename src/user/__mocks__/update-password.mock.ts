import { UpdatePasswordDto } from "../dto/update-password.dto";

export const updatePasswordMock: UpdatePasswordDto = {
    lastPassword: "abc",
    newPassword: "kdjfsd",
};

export const updatePasswordInvalidMock: UpdatePasswordDto = {
    lastPassword: "dsjfhnsd",
    newPassword: "kvjdskj",
};
