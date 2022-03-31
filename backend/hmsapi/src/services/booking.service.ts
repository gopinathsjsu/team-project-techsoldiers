import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Booking, Prisma, Location } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}
  async bookings(): Promise<Booking[] | null> {
    return this.prisma.booking.findMany({});
  }

  async bookingById(
    bookingWhereUniqueInput: Prisma.BookingWhereUniqueInput,
  ): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: bookingWhereUniqueInput,
    });
  }

}
