import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Ip,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    const user = await this.authService.login(body.email, body.password, {
      ipaddress: ip,
      userAgent: request.headers['user-agent'],
    });
    // return only error in nestjs
    if (user instanceof HttpException) {
      throw user;
    }

    return user;
  }

  @Post('register')
  async register(@Req() request, @Ip() ip: string, @Body() body: RegisterDto) {
    return this.authService.register(body.name, body.email, body.password, {
      ipaddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }
}
