import { Controller, Get, Param , Query} from '@nestjs/common';
import { AmenitiesService } from 'src/services/amenities.service';
import { Amenities as AmenitiesModel } from '.prisma/client';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) { }

  @Get()
  getAllAmenities(): Promise<AmenitiesModel[]> {
    return this.amenitiesService.amenities();
  }

}