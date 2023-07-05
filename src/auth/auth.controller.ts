import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { LoginAuthDto } from './dto';
import { Auth, GetUser } from './decorators';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ operationId: 'createUser', summary: 'Create user' })
  @Post('register')
  createAuth(@Body() createUserDto: CreateUserDto) {
    return this.authService.createAuth(createUserDto);
  }

  @ApiOperation({ operationId: 'loginUser', summary: 'Login user' })
  @Post('login')
  loginAuth(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginAuth(loginAuthDto);
  }

  @ApiOperation({
    operationId: 'checkToken',
    summary: 'Check token expiration',
  })
  @ApiBearerAuth()
  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: UserEntity) {
    return this.authService.checkAuthStatus(user);
  }
}
