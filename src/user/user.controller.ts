import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from 'src/user/dto';
// import { Auth } from '../auth/decorators';
// import { ValidRoles } from './../common/enums/valid.roles';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Auth(ValidRoles.ADMIN)
  @ApiOperation({ operationId: 'listUsers', summary: 'Get all user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserDto] })
  @Get()
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  // @Auth(ValidRoles.ADMIN)
  @ApiOperation({ operationId: 'retrieveUser', summary: 'Get user by id' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findById(id);
  }

  // @Auth(ValidRoles.ADMIN)
  @ApiOperation({ operationId: 'updateUser', summary: 'Update user' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: UserDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  // @Auth(ValidRoles.ADMIN)
  @ApiOperation({ operationId: 'disabledUser', summary: 'Disable user' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  @Patch(':id/disable')
  @UseInterceptors(ClassSerializerInterceptor)
  patch(@Param('id') id: string): Promise<boolean> {
    return this.userService.disable(id);
  }
}
