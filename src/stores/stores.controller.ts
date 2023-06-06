import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { StoresService } from './stores.service';
import { CreateStoreDto, UpdateStoreDto } from 'src/stores/dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/user/entities/user.entity';
import { PaginationDto } from 'src/common/dtos';
import { ValidRoles } from 'src/common/enums';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @Auth(ValidRoles.USER)
  @ApiOperation({ summary: 'Create a new store' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  create(@Body() createStoreDto: CreateStoreDto, @GetUser() user: User) {
    return this.storesService.create(createStoreDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stores' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.storesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store by id' })
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.USER)
  @ApiOperation({ summary: 'Update store' })
  update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
    @GetUser() user: User,
  ) {
    return this.storesService.update(id, updateStoreDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.USER)
  @ApiOperation({ summary: 'Disable stores' })
  remove(@Param('id') id: string) {
    return this.storesService.remove(id);
  }
}
