import { Injectable } from '@nestjs/common';
import { Room, Prisma } from '.prisma/client';
import { BookingService } from './booking.service';
import { HotelRoomDetails } from 'src/models/HotelRoomDetails';

@Injectable()
export class RoomAvailabilityService {
  constructor(private readonly bookingService: BookingService) {}
  async fetchRoomAvailability(hotelId: number, roomId: number, startDate: Date, endDate: Date, current: number): Promise<number> {
    const countResult: any = await this.bookingService.getRoomsBookedForDates(Number(hotelId), Number(roomId), startDate, endDate);
    console.log(countResult);
    return countResult && countResult.length == 1 ? current - countResult[0].bookedCount : current;
  }
}
