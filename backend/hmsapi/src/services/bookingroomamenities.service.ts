import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { BookingRoomAmenities } from '.prisma/client';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingRoomAmenitiesService {
  constructor(private prisma: PrismaService) {}
  async amenities(): Promise<BookingRoomAmenities[] | null> {
    return this.prisma.bookingRoomAmenities.findMany({});
  }

  async createBookingRoomAmenities(data: Prisma.BookingRoomAmenitiesCreateInput): Promise<BookingRoomAmenities> {
    return this.prisma.bookingRoomAmenities.create({
      data
    });
  }

}
