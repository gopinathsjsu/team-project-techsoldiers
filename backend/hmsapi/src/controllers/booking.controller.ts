import { Controller, Get, Param, Body, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { BookingService } from 'src/services/booking.service';
import { Booking as BookingModel } from '.prisma/client';
import { BookingRequest } from 'src/models/BookingRequest';
import { ChangeBookingRequest } from 'src/models/ChangeBookingRequest';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('jwt'))
  async createBooking( @Req() req : any,
    @Body() bookingData: BookingRequest,
  ): Promise<BookingModel> {
    const { bookingToDate, bookingFromDate,  hotelId, roomId,  } = bookingData;

    console.log(req.user.email);
    const totalPrice = 2000;
    const status = "Booked";
    return await this.bookingService.createBooking({
      bookingToDate,
      bookingFromDate,
      totalPrice,
      status: status,
      hotel: {
        connect: { id: Number(hotelId) },
      },
      customer: {
        connect: { customerId: Number(1) },
      }
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
  @UseGuards(AuthGuard('jwt'))
  async changeBooking( @Req() req : any,@Param('id') id: string,
    @Body() changeBookingData: ChangeBookingRequest,
  ): Promise<BookingModel> {

    console.log(req.user.email);

    const { bookingToDate, bookingFromDate , customerId,hotelId } = changeBookingData;
   console.log(changeBookingData);
   const totalPrice = 2000;
    
   const booking = await this.bookingService.bookingById({ id: Number(id) });
   const bookingHistory =  JSON.stringify({"startDate": booking.bookingFromDate , "toDate" : booking.bookingToDate});

   console.log(bookingHistory);
   return await this.bookingService.updateBooking({
      where: { id: Number(id) },
      data: { 
        status: 'ChangedBooking',
     bookingHistory: bookingHistory,
    bookingFromDate :bookingFromDate,
     bookingToDate: bookingToDate ,
    totalPrice: totalPrice,
  
  },
     });

  }

}
