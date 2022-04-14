import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Room,HotelRoom, Prisma, Location } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
  async rooms(): Promise<Room[] | null> {
    return this.prisma.room.findMany({});
  }

  
    async roomsByHotelId(params: {
      where?: Prisma.HotelRoomWhereInput;
      }): Promise<HotelRoom[]> {
        const { where } = params;
        return this.prisma.hotelRoom.findMany({
          where,
          include: {
            room :true
          }
      
        });
      }

}