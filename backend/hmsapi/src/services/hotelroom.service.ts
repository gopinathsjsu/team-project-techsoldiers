import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Room, HotelRoom, Prisma, Location } from '.prisma/client';
import { PrismaService } from './prisma.service';
import { APIHotelRoom } from 'src/models/APIHotelRoom';

@Injectable()
export class HotelRoomService {
  constructor(private prisma: PrismaService) {}

  async hotelRoomsById(params: { where?: Prisma.HotelRoomWhereInput }): Promise<APIHotelRoom> {
    const { where } = params;
    return this.prisma.hotelRoom.findFirst({
      where: where,
      include: {
        room: true,
      },
    });
  }
  async hotelRoomsByHotelId(params: { where?: Prisma.HotelRoomWhereInput }): Promise<APIHotelRoom[]> {
    const { where } = params;
    return this.prisma.hotelRoom.findMany({
      where: where,
      include: {
        room: true,
      },
    });
  }
}
