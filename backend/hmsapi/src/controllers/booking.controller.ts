import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { BookingService } from 'src/services/booking.service';
import { Booking as BookingModel } from '.prisma/client';
import { BookingRequest } from 'src/models/BookingRequest';
import { ChangeBookingRequest } from 'src/models/ChangeBookingRequest';
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  getAllBookings(): Promise<BookingModel[]> {
    return this.bookingService.bookings();
  }

  @Get('/:id') 
  async getHotelById(@Param('id') id: string): Promise<BookingModel> {
    return this.bookingService.bookingById({ id: Number(id) });
  }

  @Get('/hotel/:id')
  async getBookingsByHotel(@Param('id') id: string): Promise<BookingModel[]> {
    return this.bookingService.bookingsByHotelId({
      where: {
        hotelId: Number(id),
      },
    });
  }

  @Post()
  async createBooking(
    @Body() bookingData: BookingRequest,
  ): Promise<BookingModel> {
    const { bookingToDate, bookingFromDate, customerId, totalPrice, hotelId, status } = bookingData;
    return await this.bookingService.createBooking({
      bookingToDate,
      bookingFromDate,
      totalPrice,
      status: status,
      hotel: {
        connect: { id: Number(hotelId) },
      },
      customer: {
        connect: { customerId: Number(customerId) },
      },
    });
  }

  @Put('/:id')
  async cancelBooking(@Param('id') id: string): Promise<BookingModel> {
    return this.bookingService.updateBooking({
      where: { id: Number(id) },
      data: { status: 'Cancel' },
    });
  }

  @Put('/update/:id')
  async changeBooking(@Param('id') id: string,
    @Body() changeBookingData: ChangeBookingRequest,
  ): Promise<BookingModel> {
    const { bookingToDate, bookingFromDate , customerId,hotelId  } = changeBookingData;
   console.log(changeBookingData);
   const totalPrice = 2000;
     
   const booking = await this.bookingService.bookingById({ id: Number(id) });

   const bookingHistory =  booking.bookingFromDate + " ; "+ bookingToDate;

   return await this.bookingService.updateBooking({
      where: { id: Number(id) },
      data: { 
        status: 'ChangedBooking' ,
    bookingFromDate :bookingFromDate,
     bookingToDate: bookingToDate ,
    totalPrice: totalPrice},
     });

  }

}
