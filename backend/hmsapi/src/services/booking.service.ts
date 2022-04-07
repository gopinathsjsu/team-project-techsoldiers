import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Booking, Prisma, Location } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) { }
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

    async bookingsByHotelId(params: {
        where?: Prisma.BookingWhereInput;
    }): Promise<Booking[]> {
        const { where } = params;
        return this.prisma.booking.findMany({
            where,
        });
    }

    async createBooking(data: Prisma.BookingCreateInput): Promise<Booking> {
        return this.prisma.booking.create({
            data,
        });
    }

    async updateBooking(params: {
        where: Prisma.BookingWhereUniqueInput;
        data: Prisma.BookingUpdateInput;
    }): Promise<Booking> {
        const { where, data } = params;
        return this.prisma.booking.update({
            data,
            where,
        });
    }

}
