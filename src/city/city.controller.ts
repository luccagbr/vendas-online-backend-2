import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
    constructor(
        private readonly cityService: CityService
    ) {}

    @Get()
    async getAllCities(): Promise<CityEntity[]> {
        return this.cityService.getAllCities();
    }

    @Get('/:stateId')
    async getAllCitiesByStateId(@Param('stateId') stateId: string): Promise<CityEntity[]> {
        return await this.cityService.getAllCitiesByStateId(Number(stateId));
    }
}
