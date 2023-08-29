import { compare, hash } from "bcrypt";

export const createPasswordHashed = async (password: string): Promise<string> => {
    const saltDrRounds = 10;

    return hash(password, saltDrRounds);
};

export const validatePassword = async (password: string, passwordHashed: string): Promise<boolean> => {
    return compare(password, passwordHashed || "");
};
