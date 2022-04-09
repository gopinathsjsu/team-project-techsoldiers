import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Location, Prisma } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}
  async locations(): Promise<Location[] | null> {
    return this.prisma.location.findMany({});
  }

  async location(
    locationWhereUniqueInput: Prisma.LocationWhereUniqueInput,
  ): Promise<Location | null> {
    return this.prisma.location.findUnique({
      where: locationWhereUniqueInput,
    });
  }

  async createLocation(data: Prisma.LocationCreateInput): Promise<Location> {
    return this.prisma.location.create({
        data,
    });
}
}
