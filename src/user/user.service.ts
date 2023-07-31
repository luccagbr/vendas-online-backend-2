import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor() {}

    async getAllUsers() {
        return "Hello world!"
    }
}
