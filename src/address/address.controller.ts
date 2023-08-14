import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressEntity } from "./entities/address.entity";
import { Roles } from "src/decorators/roles.decorator";
import { UserType } from "src/user/enum/user-type.enum";
import { UserId } from "src/decorators/user-id.decorator";

@Roles(UserType.User)
@Controller("address")
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    async getAllAddress() {
        return this.addressService.getAllAddress();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @UserId("userId") userId: number,
        @Body() createAddressDto: CreateAddressDto,
    ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, Number(userId));
    }
}
