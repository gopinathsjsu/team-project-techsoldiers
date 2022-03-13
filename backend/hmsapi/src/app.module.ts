import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, LocationController],
  providers: [PrismaService, AppService, LocationService],
})
export class AppModule {}
