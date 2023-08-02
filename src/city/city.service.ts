import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService
    ) {}

    async getAllCities(): Promise<CityEntity[]> {
        return this.cityRepository.find();
    }

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
            this.cityRepository.find({
                where: {
                    stateId
                }
            }))
    }

    async getCityById(cityId: number): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({
            where: {
                id: cityId
            }
        });

        if(!city) {
            throw new NotFoundException('City id not found')
        }

        return city;
    }
}
