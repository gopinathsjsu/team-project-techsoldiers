import { Controller, Get, Param } from '@nestjs/common';
import { HotelService } from 'src/services/hotel.service';
import { Hotel as HotelModel } from '.prisma/client';
@Controller('api/hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  getAllHotels(): Promise<HotelModel[]> {
    return this.hotelService.hotels();
  } 

}