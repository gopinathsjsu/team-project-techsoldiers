import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authenticateRequest: { email: string; password: string },
  ) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm')
  async confirm(@Body() confirmRequest: { code: string; email: string }) {
    try {
      return await this.authService.confirmRegistration(confirmRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('register')
  async register(
    @Body()
    registerRequest: {
      email: string;
      password: string;
      given_name: string;
      family_name: string;
      birthdate: string;
      gender: string;
    },
  ) {
    try {
      return await this.authService.registerUser(registerRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
