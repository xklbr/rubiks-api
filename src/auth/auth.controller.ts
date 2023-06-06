import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { LoginAuthDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from 'src/user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create user' })
  @Post('register')
  createAuth(@Body() createUserDto: CreateUserDto) {
    return this.authService.createAuth(createUserDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  loginAuth(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginAuth(loginAuthDto);
  }

  @ApiOperation({ summary: 'Check token expiration' })
  @ApiBearerAuth()
  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
