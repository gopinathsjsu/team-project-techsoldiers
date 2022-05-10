import { Controller, Get,Post,Body } from '@nestjs/common';
import { LocationService } from 'src/services/location.service';
import { Location as LocationModel } from '.prisma/client';
import { LocationRequest } from 'src/models/LocationRequest';
@Controller('location')
export class LocationController {
  constructor(private readonly locService: LocationService) {}

  @Get()
  getAllLocations(): Promise<LocationModel[]> {
    return this.locService.locations();
  }

  @Post()
    async createLocation(
        @Body() locationData: LocationRequest,
    ): Promise<LocationModel> {
        const { city, country, address} = locationData;
        return await this.locService.createLocation({
          city,
          country,
          address
        });

    }

}
