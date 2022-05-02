import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Booking, Prisma, Location } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}
  async bookings(): Promise<Booking[] | null> {
    return this.prisma.booking.findMany({});
  }

  async bookingById(bookingWhereUniqueInput: Prisma.BookingWhereUniqueInput): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: bookingWhereUniqueInput,
      include: {
        hotel: true,
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
  async getRoomsBookedForDates(hotelId: number, roomId:number , startDate: Date, endDate: Date) {
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
    });
  }
}
