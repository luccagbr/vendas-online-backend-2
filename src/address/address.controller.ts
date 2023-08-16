import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressEntity } from "./entities/address.entity";
import { Roles } from "../decorators/roles.decorator";
import { UserType } from "../user/enum/user-type.enum";
import { UserId } from "../decorators/user-id.decorator";
import { ReturnAddressDto } from "./dto/return-address.dto";

@Roles(UserType.User, UserType.Admin)
@Controller("address")
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    // @Get()
    // async getAllAddress() {
    //     return this.addressService.getAllAddress();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @UserId("userId") userId: number,
        @Body() createAddressDto: CreateAddressDto,
    ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, Number(userId));
    }

    @Get()
    async findAddressByUserId(@UserId("userId") userId: number): Promise<ReturnAddressDto[]> {
        return (await this.addressService.findAddressByUserId(Number(userId))).map((address) => {
            return new ReturnAddressDto(address);
        });
    }
}
