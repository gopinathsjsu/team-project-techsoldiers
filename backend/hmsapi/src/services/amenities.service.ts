import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import {Prisma, Amenities } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AmenitiesService {
  constructor(private prisma: PrismaService) {}
  async amenities(): Promise<Amenities[] | null> {
    return this.prisma.amenities.findMany({});
  }
}