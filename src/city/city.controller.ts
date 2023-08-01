import { Controller, Get } from '@nestjs/common';
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
}
