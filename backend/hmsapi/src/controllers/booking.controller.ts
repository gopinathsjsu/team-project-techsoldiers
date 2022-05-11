import { Controller, Get, Param, Body, Post, Put, Req, Request, UseGuards, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
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
import { CustomerService } from 'src/services/customer.service';
import { Decimal } from '@prisma/client/runtime';
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
    private readonly bookingRoomAmenitiesService: BookingRoomAmenitiesService,
    private readonly roomService: RoomService,
    private readonly roomAvailabilityService: RoomAvailabilityService,
    private readonly amenitiesService: AmenitiesService,
    private readonly custService: CustomerService,
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
  async createBooking(@Req() req: any, @Body() bookingData: BookingRequest): Promise<BookingModel | any> {
    const { hotelId, roomId, noOfRooms, amenities } = bookingData;
    let { bookingToDate, bookingFromDate } = bookingData;
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

    if (!currRoom) {
      throw new BadRequestException({ msg: 'No Such Room' });
    }
    bookingFromDate = new Date(bookingFromDate);
    bookingToDate = new Date(bookingToDate);

    console.log(bookingFromDate.getTime());
    const roomscount = await this.roomAvailabilityService.fetchRoomAvailability(Number(hotelId), roomId, bookingFromDate, bookingToDate, currRoom.numberOfRooms);
    if (noOfRooms > roomscount) {
      //throw error
      throw new BadRequestException({ msg: 'Rooms not Available' });
    } else {
      //add them
      //create booking
      const pricePerRoom = await this.calculatePrice(Number(hotelId), roomId, bookingFromDate, bookingToDate);
      console.log(pricePerRoom);
      let totalPrice = pricePerRoom * noOfRooms;
      console.log(totalPrice);

      const amenitiesPrice = await this.calculateAmenities(amenities);
      totalPrice += amenitiesPrice;
      console.log(totalPrice);
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

      //update rewards for customer
      try {
        const cust = await this.custService.customerById({ customerId: Number(custId) });

        console.log('Customer reward : ' + cust.rewards);

        const reward = new Decimal(cust.rewards).add(100);
        const customer = await this.custService.updateRewards({
          where: { customerId: Number(custId) },
          data: { rewards: reward },
        });

        console.log(customer);
      } catch (err) {
        console.log('Eror while updating rewards');
      }

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
       // console.log('Amenities :' + amenities[_i].amenities);
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
      console.log('Created booking : ',bookingData );
      return booking;
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async cancelBooking(@Req() req: any, @Param('id') id: string): Promise<BookingModel> {
    return this.bookingService.updateBooking({
      where: { id: Number(id) },
      data: { status: 'Cancel' },
    });
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard('jwt'))
  async changeBooking(@Req() req: any, @Param('id') id: string, @Body() changeBookingData: ChangeBookingRequest): Promise<BookingModel> {
    console.log(req.user.email);

    const { customerId, hotelId } = changeBookingData;
    let { bookingToDate, bookingFromDate } = changeBookingData;
    bookingFromDate = new Date(bookingFromDate);
    bookingToDate = new Date(bookingToDate);
    console.log(changeBookingData);

    let totalPrice = 2000;

    const booking = await this.bookingService.bookingById({ id: Number(id) });
    console.log(booking);
    const currRoom = await this.bookingService.getRoomByBookingId(booking.id);
    if (!currRoom) {
      throw new BadRequestException({ msg: 'Invalid Room' });
    }
    const roomscount = await this.roomAvailabilityService.fetchRoomAvailability(Number(hotelId), currRoom.roomId, bookingFromDate, bookingToDate, currRoom.numberOfRooms);
    if (roomscount < booking.bookingRoomAmenities.length) {
      throw new BadRequestException({ msg: 'Rooms not Available' });
    }
    const bookingHistory = JSON.stringify({ startDate: booking.bookingFromDate, toDate: booking.bookingToDate });
    const pricePerRoom = await this.calculatePrice(Number(hotelId), currRoom.roomId, bookingFromDate, bookingToDate);
    console.log(pricePerRoom);
    totalPrice = pricePerRoom * booking.bookingRoomAmenities.length;
    console.log(totalPrice);
    const roomAmenities: RoomAmenitiesRequest[] = [];
    for (const am of booking.bookingRoomAmenities) {
      const reqs = am.amenities.split(',').map((e) => parseInt(e));
      roomAmenities.push({
        roomId: am.hotelRoomId,
        amenities: reqs,
      });
    }
    const amenitiesPrice = await this.calculateAmenities(roomAmenities);
    totalPrice += amenitiesPrice;
    console.log(totalPrice);

    console.log(bookingHistory);
    return await this.bookingService.updateBooking({
      where: { id: Number(id) },
      data: {
        status: 'Booked',
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
    console.log(amenities);
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
