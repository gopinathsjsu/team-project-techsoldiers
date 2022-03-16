import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelController } from './controllers/hotel.controller';
import { LocationController } from './controllers/location.controller';
import { HotelService } from './services/hotel.service';
import { LocationService } from './services/location.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, LocationController, HotelController],
  providers: [PrismaService, AppService, LocationService, HotelService],
})
export class AppModule {}
