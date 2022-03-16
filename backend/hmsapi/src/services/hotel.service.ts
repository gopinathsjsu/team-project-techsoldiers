import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Hotel, Prisma, Location } from '.prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class HotelService {
  constructor(private prisma: PrismaService) {}
  async hotels(): Promise<Hotel[] | null> {
    return [{"id":1,"name":"Marriot","locationid":1,"description":"Previous Hotel"},{"id":2,"name":"Hyatt","locationid":1,"description":"New Hotel added"},{"id":3,"name":"PristinePro","locationid":2,"description":"New location hotel"}];
  }


}
