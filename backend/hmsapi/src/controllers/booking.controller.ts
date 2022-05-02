import { Controller, Get, Param, Body, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { BookingService } from 'src/services/booking.service';
import { Booking as BookingModel } from '.prisma/client';
import { BookingRequest } from 'src/models/BookingRequest';
import { ChangeBookingRequest } from 'src/models/ChangeBookingRequest';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/services/user.service';
import { BookingRoomAmenitiesService } from 'src/services/bookingroomamenities.service';
import { RoomService } from 'src/services/room.service';
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService, private readonly userService: UserService,
    private readonly bookingRoomAmenitiesService : BookingRoomAmenitiesService, private readonly roomService : RoomService) {}

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
    const { bookingToDate, bookingFromDate,  hotelId, roomId,noOfRooms, amenities } = bookingData;
    console.log(req.user.email);

    // fetching customerID based on email
    const custId = await this.userService.custIdByUserEmail({ 
      where: {
          email: req.user.email,
      }
    })



    //create booking
    const totalPrice = 2000;
    const status = "Booked";
    const booking =  await this.bookingService.createBooking({
      bookingToDate,
      bookingFromDate,
      totalPrice,
      status: status,
      hotel: {
        connect: { id: Number(hotelId) },
      },
      customer: {
        connect: { customerId: Number(custId) },
      }
    });

   const bookingId = booking.id;
   console.log(bookingId);

//fetching hotelRoomId based on hotel 

const hotelRoomId = await this.roomService.hotelRoomByHotelIdAndRoomId({ 
  where: {
     
    hotelId: Number(hotelId),
    roomId: Number(roomId)
  }

});

   //create entry in booking room amenities for noOfRooms
console.log(hotelRoomId);


for (var _i = 0; _i < noOfRooms; _i++) {

  console.log("AMenities :" + amenities[_i].amenities);
  const bookingRoomAmenitiesData =  await this.bookingRoomAmenitiesService.createBookingRoomAmenities({
    totalPrice,
    amenities: amenities[_i].amenities+"",
    hotelRoom: {
      connect: { id: Number(hotelRoomId) },
    },
    booking: {
      connect: { id: Number(bookingId)},
    }
  });

  console.log(bookingRoomAmenitiesData.id);

}

return booking;

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
