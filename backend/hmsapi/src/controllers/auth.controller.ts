import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService : UserService) {}

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
      name: string;
      password: string;
    },
  ) {
    try {
      return await this.authService.registerUser(registerRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('/fetchrole')
  @UseGuards(AuthGuard('jwt'))
  async fetchRole(@Req() req : any): Promise<String> {

    const role = await this.userService.fetchUserRole({
      where: {
        email: req.user.email,
      },
    });

    console.log(role);

    const response = JSON.stringify({"Role" : role});
  

  return response;



  }
}
