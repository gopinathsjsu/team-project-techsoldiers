import { Controller, Get } from '@nestjs/common';
import { LocationService } from 'src/services/location.service';
import { Location as LocationModel } from '.prisma/client';
@Controller('location')
export class LocationController {
  constructor(private readonly locService: LocationService) {}

  @Get()
  getAllLocations(): Promise<LocationModel[]> {
    return this.locService.locations();
  }
}
