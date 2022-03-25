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

  @Get('/:id')
  async getHotelById(@Param('id') id: string): Promise<HotelModel> {
    return this.hotelService.hotelById({ id: Number(id) });
  }  

  @Get('/location/:id')
  async getHotelByLocations(@Param('id') id: string): Promise<HotelModel[]> {

    return this.hotelService.hotelsByLocation({
        where: {
         
              locationid: Number(id),
            
        },
      });
  }
  

}