import { Controller, Get, Param } from '@nestjs/common';
import { BookingService } from 'src/services/booking.service';
import { Booking as BookingModel } from '.prisma/client';
@Controller('api/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  getAllBookings(): Promise<BookingModel[]> {0
    return this.bookingService.bookings();
  } 

}