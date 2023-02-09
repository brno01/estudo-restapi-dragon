import {
  Controller,
  UseGuards,
  Request,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Login } from './models/authLogin';
import { ApiBody, ApiInternalServerErrorResponse, ApiProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginRequestBody } from './models/login-body';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @ApiProperty({ type: LoginRequestBody })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @ApiBody({ type: LoginRequestBody })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Request() req: Login) {
    return this.authService.login(req.user);
  }
}