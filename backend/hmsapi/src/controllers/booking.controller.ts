import { Controller, Get, Param } from '@nestjs/common';
import { BookingService } from 'src/services/booking.service';
import { Booking as BookingModel } from '.prisma/client';
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  getAllBookings(): Promise<BookingModel[]> {0
    return this.bookingService.bookings();
  } 

  @Get('/:id')
  async getHotelById(@Param('id') id: string): Promise<BookingModel> {
    return this.bookingService.bookingById({ id: Number(id) });
  }  
}