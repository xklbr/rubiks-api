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

import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from 'src/recipes/dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserEntity } from 'src/user/entities/user.entity';
import { PaginationDto } from 'src/common/dtos';
import { ValidRoles } from 'src/common/enums';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @Auth(ValidRoles.USER)
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @GetUser() user: UserEntity,
  ) {
    return this.recipesService.create(createRecipeDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all recipes' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.recipesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get recipe by id' })
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.USER)
  @ApiOperation({ summary: 'Update recipe' })
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @GetUser() user: UserEntity,
  ) {
    return this.recipesService.update(id, updateRecipeDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.USER)
  @ApiOperation({ summary: 'Disable recipes' })
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
