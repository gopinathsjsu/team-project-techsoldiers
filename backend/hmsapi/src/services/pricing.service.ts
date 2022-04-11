import { Injectable } from '@nestjs/common';
import { PricingType, Prisma } from '.prisma/client';
import { PrismaService } from './prisma.service';
import { APIPricingType } from 'src/models/APIPricingType';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}
  async pricings(): Promise<PricingType[] | null> {
    return this.prisma.pricingType.findMany({});
  }

  async pricingforHotel(
    hotelid: number,
    roomid: number,
  ): Promise<PricingType[] | null> {
    return this.prisma.pricingType.findMany({
      where: {
        hotelRoom: {
          hotelId: hotelid,
          roomId: roomid,
        },
      },
    });
  }
  async pricingforHotelById(hotelid: number): Promise<APIPricingType[] | null> {
    return this.prisma.pricingType.findMany({
      where: {
        hotelRoom: {
          hotelId: hotelid,
        },
      },
      include: {
        hotelRoom: true,
      },
    });
  }
}
