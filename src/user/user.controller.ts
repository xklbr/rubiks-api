import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserDto } from 'src/user/dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from './../common/enums/valid.roles';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Auth(ValidRoles.ADMIN)
  @ApiOperation({ summary: 'Get all user' })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth(ValidRoles.ADMIN)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Auth(ValidRoles.ADMIN)
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Auth(ValidRoles.ADMIN)
  @ApiOperation({ summary: 'Disable user' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
