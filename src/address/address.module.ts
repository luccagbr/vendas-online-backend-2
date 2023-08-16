import { Module } from "@nestjs/common";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressEntity } from "./entities/address.entity";
import { UserModule } from "../user/user.module";
import { CityModule } from "../city/city.module";

@Module({
    imports: [UserModule, CityModule, TypeOrmModule.forFeature([AddressEntity])],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {}
