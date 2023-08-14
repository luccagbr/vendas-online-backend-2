import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAllAddress() {
    return this.addressService.getAllAddress();
  }

  @Roles(UserType.User)
  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Param('userId') userId: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, Number(userId));
  }
}
