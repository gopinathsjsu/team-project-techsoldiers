import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { RoomService } from 'src/services/room.service';
import { Room as RoomModel } from '.prisma/client';
import { HotelRoom as HotelRoomModel } from '.prisma/client';
import { HotelRoomService } from 'src/services/hotelroom.service';
import { BookingService } from 'src/services/booking.service';
import { HotelRoomDetails } from 'src/models/HotelRoomDetails';
import { resourceLimits } from 'worker_threads';
import { RoomAvailabilityService } from 'src/services/roomavailability.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly hotelRoom: HotelRoomService,
    private readonly bookingService: BookingService,
    private readonly roomAvailabilityService: RoomAvailabilityService,
  ) {}

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

  @Get('/hotel/:hotelId/rooms?')
  async getRoomByFilters(
    @Param('hotelId') hotelId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<HotelRoomDetails[]> {
    const result: HotelRoomDetails[] = [];
    try {
      console.log(hotelId, startDate, endDate);
      const fStartDate: Date = new Date(startDate);
      const fEndDate: Date = new Date(endDate);
      console.log(fStartDate, fEndDate);
      //fetch all rooms available at the hotel id
      const rooms = await this.roomService.roomsByHotelId({
        where: {
          hotelId: Number(hotelId),
        },
      });

      for (const room of rooms) {
        const hrd: HotelRoomDetails = { ...room, currentAvailablity: await this.roomAvailabilityService.fetchRoomAvailability(Number(hotelId), room.roomId, fStartDate, fEndDate, room.numberOfRooms) };
        result.push(hrd);
      }
      //for given strart Date and end Date
      //find maximum number of bookings for individual hotel room
      return result;
    } catch (err) {
      throw new HttpException({ msg: 'Error Processing Request' }, HttpStatus.BAD_REQUEST);
    }
  }
}
