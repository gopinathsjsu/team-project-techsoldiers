import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Hotel, Prisma, Location } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class HotelService {
  constructor(private prisma: PrismaService) {}
  async hotels(): Promise<Hotel[] | null> {
    return this.prisma.hotel.findMany({});
  }

  async hotelById(
    hotelWhereUniqueInput: Prisma.HotelWhereUniqueInput,
  ): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({
      where: hotelWhereUniqueInput,
      include: { 
        hotelRooms:true,
        booking:true
      }
    });
  }

  async hotelsByLocation(params: {
    where?: Prisma.HotelWhereInput;
    }): Promise<Hotel[]> {
      const { where } = params;
      return this.prisma.hotel.findMany({
        where,
    
      });
    }

    async createHotel(data: Prisma.HotelCreateInput): Promise<Hotel> {
      return this.prisma.hotel.create({
          data,
      });
  }

}
