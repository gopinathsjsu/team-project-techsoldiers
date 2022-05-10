import { Controller, Get, Param, Body, Post, Put, Req, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { BookingService } from 'src/services/booking.service';
import { Booking as BookingModel } from '.prisma/client';
import { BookingRequest, RoomAmenitiesRequest } from 'src/models/BookingRequest';
import { ChangeBookingRequest } from 'src/models/ChangeBookingRequest';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/services/user.service';
import { BookingRoomAmenitiesService } from 'src/services/bookingroomamenities.service';
import { RoomService } from 'src/services/room.service';
import { RoomAvailabilityService } from 'src/services/roomavailability.service';
import { AmenitiesService } from 'src/services/amenities.service';
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
    private readonly bookingRoomAmenitiesService: BookingRoomAmenitiesService,
    private readonly roomService: RoomService,
    private readonly roomAvailabilityService: RoomAvailabilityService,
    private readonly amenitiesService: AmenitiesService,
  ) {}

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
  async createBooking(@Req() req: any, @Body() bookingData: BookingRequest): Promise<BookingModel> {
    const { bookingToDate, bookingFromDate, hotelId, roomId, noOfRooms, amenities } = bookingData;
    console.log(req.user.email);

    // fetching customerID based on email
    const custId = await this.userService.custIdByUserEmail({
      where: {
        email: req.user.email,
      },
    });
    //see if rooms are available

    //fetch room
    const currRoom = await this.roomService.getHotelRoombyHotelIdandRoomId({
      where: {
        hotelId: Number(hotelId),
        roomId: roomId,
      },
    });
    const roomscount = await this.roomAvailabilityService.fetchRoomAvailability(Number(hotelId), roomId, bookingFromDate, bookingToDate, currRoom.numberOfRooms);
    if (noOfRooms > roomscount) {
      //throw error
    } else {
      //add them
      //create booking
      const pricePerRoom = await this.calculatePrice(Number(hotelId), roomId, bookingFromDate, bookingToDate);
      let totalPrice = pricePerRoom * noOfRooms;
      const amenitiesPrice = await this.calculateAmenities(amenities);
      totalPrice += amenitiesPrice;
      const status = 'Booked';
      const booking = await this.bookingService.createBooking({
        bookingToDate,
        bookingFromDate,
        totalPrice,
        status: status,
        hotel: {
          connect: { id: Number(hotelId) },
        },
        customer: {
          connect: { customerId: Number(custId) },
        },
      });

      const bookingId = booking.id;
      console.log(bookingId);

      //fetching hotelRoomId based on hotel

      const hotelRoomId = await this.roomService.hotelRoomByHotelIdAndRoomId({
        where: {
          hotelId: Number(hotelId),
          roomId: Number(roomId),
        },
      });

      //create entry in booking room amenities for noOfRooms
      console.log(hotelRoomId);

      for (let _i = 0; _i < noOfRooms; _i++) {
        console.log('AMenities :' + amenities[_i].amenities);
        const bookingRoomAmenitiesData = await this.bookingRoomAmenitiesService.createBookingRoomAmenities({
          totalPrice,
          amenities: amenities[_i].amenities + '',
          hotelRoom: {
            connect: { id: Number(hotelRoomId) },
          },
          booking: {
            connect: { id: Number(bookingId) },
          },
        });

        console.log(bookingRoomAmenitiesData.id);
      }

      return booking;
    }
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
  async changeBooking(@Req() req: any, @Param('id') id: string, @Body() changeBookingData: ChangeBookingRequest): Promise<BookingModel> {
    console.log(req.user.email);

    const { bookingToDate, bookingFromDate, customerId, hotelId } = changeBookingData;
    console.log(changeBookingData);
    const totalPrice = 2000;

    const booking = await this.bookingService.bookingById({ id: Number(id) });
    const bookingHistory = JSON.stringify({ startDate: booking.bookingFromDate, toDate: booking.bookingToDate });

    console.log(bookingHistory);
    return await this.bookingService.updateBooking({
      where: { id: Number(id) },
      data: {
        status: 'ChangedBooking',
        bookingHistory: bookingHistory,
        bookingFromDate: bookingFromDate,
        bookingToDate: bookingToDate,
        totalPrice: totalPrice,
      },
    });
  }
  async calculatePrice(hotelId: number, roomId: number, bookingFromDate: Date, bookingToDate: Date) {
    //calculate price for room
    const pricePerRoom = await this.bookingService.getPriceForRoom(hotelId, roomId, bookingFromDate, bookingToDate);
    return pricePerRoom;
  }
  async calculateAmenities(amenities: RoomAmenitiesRequest[]): Promise<number> {
    let amenitiesList: number[] = [];
    amenities.forEach((room) => {
      amenitiesList = [...amenitiesList, ...room.amenities];
    });
    const amenityMaster = await this.amenitiesService.amenities();
    let totalPrice = 0;
    for (const amenity of amenitiesList) {
      const index = amenityMaster.findIndex((am) => am.id == amenity);
      totalPrice += Number(amenityMaster[index].price);
    }
    return totalPrice;
  }
}
