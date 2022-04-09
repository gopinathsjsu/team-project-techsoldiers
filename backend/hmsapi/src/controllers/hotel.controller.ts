import { Controller, Get, Param,Post,Body } from '@nestjs/common';
import { HotelService } from 'src/services/hotel.service';
import { Hotel as HotelModel } from '.prisma/client';
import { HotelRequest } from 'src/models/HotelRequest';
@Controller('hotel')
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
  
  @Post()
    async createBooking(
        @Body() hotelData: HotelRequest,
    ): Promise<HotelModel> {
        const { name, locationId, description} = hotelData;
        return await this.hotelService.createHotel({
          name,
            description,
            location: {
                connect: { id: Number(locationId) },
            }
           
        });

    }

}