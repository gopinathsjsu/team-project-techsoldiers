import { Controller, Get, Param , Query} from '@nestjs/common';
import { RoomService } from 'src/services/room.service';
import { Room as RoomModel } from '.prisma/client';
import { HotelRoom as HotelRoomModel } from '.prisma/client';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Get()
  getAllHotels(): Promise<RoomModel[]> {
    return this.roomService.rooms();
  }



  @Get('/hotel/:id')
  async getRoomsByHotel(@Param('id') id: string): Promise<HotelRoomModel[]> {  
    return this.roomService.roomsByHotelId({
      where: {
         hotelId: Number(id),

      },
    });
  }



  @Get('/filters/params?')
  async getRoomByFilters(@Query('hotelId') hotelId: Number, @Query('startDate') startDate: string, @Query('endDate') endDate: string,
    @Query('noOfGuest') noOfGuest: Number) {

    console.log(hotelId);
    console.log(startDate);
    console.log(endDate);
    console.log(noOfGuest);

    let formatStartDate = new Date(startDate);
    console.log(formatStartDate);

  }



}