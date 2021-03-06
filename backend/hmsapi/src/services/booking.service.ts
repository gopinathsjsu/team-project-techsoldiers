import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Booking, Prisma, Location } from '.prisma/client';
import { PrismaService } from './prisma.service';
import { PricingService } from './pricing.service';
import { HotelRoomService } from './hotelroom.service';
import { PricingResponse } from 'src/models/PricingResponse';
import { Pricing } from 'src/models/Pricing';
import { PricingUtility } from 'src/helpers/pricingutility';
import { HotelRoomDTO } from 'src/models/HotelRoomDetails';
import { BookingDTO } from 'src/models/BookingDTO';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService, private pricingService: PricingService, private hotelRoomService: HotelRoomService) {}
  async bookings(): Promise<Booking[] | null> {
    return this.prisma.booking.findMany({});
  }
  async getBookingsbyCustId(userid: string): Promise<BookingDTO[] | null> {
    return this.prisma.$queryRaw`Select *,b.id as id,h.name from Booking b, Hotel h where  b.hotelId=h.id and customerId IN (select id from User where email=${userid})`;
  }
  async bookingById(bookingWhereUniqueInput: Prisma.BookingWhereUniqueInput): Promise<BookingDTO | null> {
    return this.prisma.booking.findUnique({
      where: bookingWhereUniqueInput,
      include: {
        hotel: true,
        bookingRoomAmenities: true,
      },
    });
  }

  async bookingsByHotelId(params: { where?: Prisma.BookingWhereInput }): Promise<Booking[]> {
    const { where } = params;
    return this.prisma.booking.findMany({
      where,
    });
  }
  async bookingsForRoomsByHotelId(hotelId: number, startDate: Date, endDate: Date) {
    return this.prisma.$queryRaw`SELECT  hr.roomId, COUNT(*) FROM BookingRoomAmenities br,HotelRoom hr where br.id IN  (SELECT  id FROM Booking b where b.hotelId = ${hotelId} AND
                                ((DATE(bookingFromDate) <= ${startDate} AND DATE(bookingToDate) >= ${startDate} AND DATE(bookingToDate) <= ${endDate}) OR
                                (DATE(bookingFromDate) >= ${startDate} AND DATE(bookingFromDate) <= ${endDate} AND DATE(bookingToDate) >= ${endDate}) OR
                                (DATE(bookingFromDate) <= ${startDate} AND DATE(bookingToDate) >= ${endDate}) OR
                                (DATE(bookingFromDate) >= ${startDate} AND DATE(bookingToDate) <= ${endDate}) ))  AND br.hotelRoomId = hr.id GROUP BY hr.roomId`;
  }
  async getRoomsBookedForDates(hotelId: number, roomId: number, startDate: Date, endDate: Date) {
    return this.prisma.$queryRaw`SELECT COUNT(*) as bookedCount FROM BookingRoomAmenities br,HotelRoom hr where br.id IN  (SELECT  id FROM Booking b where b.hotelId = ${hotelId} AND
                                ((DATE(bookingFromDate) <= ${startDate} AND DATE(bookingToDate) >= ${startDate} AND DATE(bookingToDate) <= ${endDate}) OR
                                (DATE(bookingFromDate) >= ${startDate} AND DATE(bookingFromDate) <= ${endDate} AND DATE(bookingToDate) >= ${endDate}) OR
                                (DATE(bookingFromDate) <= ${startDate} AND DATE(bookingToDate) >= ${endDate}) OR
                                (DATE(bookingFromDate) >= ${startDate} AND DATE(bookingToDate) <= ${endDate}) ))  AND br.hotelRoomId = hr.id AND hr.roomId= ${roomId} GROUP BY hr.roomId`;
  }

  async createBooking(data: Prisma.BookingCreateInput): Promise<Booking> {
    return this.prisma.booking.create({
      data,
      include: {
        bookingRoomAmenities: true,
      },
    });
  }

  async updateBooking(params: { where: Prisma.BookingWhereUniqueInput; data: Prisma.BookingUpdateInput }): Promise<Booking> {
    const { where, data } = params;
    return this.prisma.booking.update({
      data,
      where,
      include: {
        bookingRoomAmenities: true,
      },
    });
  }
  async getRoomByBookingId(bookingId: number): Promise<HotelRoomDTO> {
    return this.prisma
      .$queryRaw<HotelRoomDTO>`SELECT * from HotelRoom hr where hr.id = (SELECT br.hotelRoomId FROM Booking b,BookingRoomAmenities br where b.id=br.bookingId and b.id=${bookingId} LIMIT 1)`;
  }

  async getPriceForRoom(hotelId: number, roomId: number, startDate: Date, endDate: Date): Promise<number> {
    const pricings = await this.pricingService.pricingforHotelById(Number(hotelId));
    console.log(pricings);
    const room = await this.hotelRoomService.hotelRoomsById({
      where: {
        hotelId: Number(hotelId),
        roomId: Number(roomId),
      },
    });
    const noOfDays = this.calculateDays(startDate, endDate);
    if (room) {
      if (pricings.length > 0) {
        console.log('Inside prices.length: ' + JSON.stringify(pricings));
        return this.processRoom(Number(roomId), room.pricePerRoom, startDate, endDate, pricings);
      } else {
        return Number(room.pricePerRoom) * noOfDays;
      }
    } else {
      return 0;
    }
  }
  async getAmenitiesPrice(ids: string[]) {}

  calculateDays(startDate: Date, endDate: Date): number {
    console.log(endDate);
    console.log(startDate);
    const difference_In_Time = endDate.getTime() - startDate.getTime();

    // To calculate the no. of days between two dates
    const days = difference_In_Time / (1000 * 3600 * 24);
    return days;
  }
  processRoom(roomId, basePrice, startDate, endDate, strategies): number {
    const pricing: Pricing = {
      basePrice: basePrice,
      startDate: startDate,
      endDate: endDate,
      strategies: strategies,
    };
    const p: PricingUtility = new PricingUtility(pricing);
    let finalPrice = 0;
    const prices = p.calculatePrices();
    const dayPrices = [];
    for (const price of prices) {
      dayPrices.push(basePrice * price);
      finalPrice += basePrice * price;
    }
    return finalPrice;
  }
}
