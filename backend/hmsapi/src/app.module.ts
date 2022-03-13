import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthConfig } from './config/auth.config';
import { AuthController } from './controllers/auth.controller';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';
import { PrismaService } from './services/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './services/auth.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AppController, LocationController, AuthController],
  providers: [PrismaService, AppService, LocationService, AuthConfig, JwtStrategy, AuthService],
})
export class AppModule {}
