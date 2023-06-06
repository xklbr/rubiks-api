import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Recipe } from './entities';
import { User } from 'src/user/entities/user.entity';

import { CreateRecipeDto, UpdateRecipeDto } from 'src/recipes/dto';
import { PaginationDto } from 'src/common/dtos';

import { MessageHandler } from 'src/common/enums';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,

    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger('RecipesService');

  async create(createRecipeDto: CreateRecipeDto, user: User) {
    try {
      const { ...recipeDetails } = createRecipeDto;
      const recipe = this.recipeRepository.create({
        ...recipeDetails,
        user: { id: user.id },
      });

      await this.recipeRepository.save(recipe);
      return recipe;
    } catch (error) {
      if (error.code === '23505')
        throw new HttpException(
          MessageHandler.RECIPE_ALREADY_EXIST,
          HttpStatus.BAD_REQUEST,
        );

      this.logger.error(error);
      throw new InternalServerErrorException(MessageHandler.UNEXPECTED_ERROR);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    const recipe = await this.recipeRepository.find({
      take: limit,
      skip: offset,
    });

    return recipe.map(({ ...rest }) => ({
      ...rest,
    }));
  }

  async findOne(id: string) {
    const recipe = await this.recipeRepository.findOneBy({ id });
    if (!recipe) throw new NotFoundException(MessageHandler.RECIPE_NOT_FOUND);

    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto, user: User) {
    const { ...toUpdate } = updateRecipeDto;
    const recipe = await this.recipeRepository.preload({
      id,
      ...toUpdate,
    });

    if (!recipe) throw new NotFoundException(MessageHandler.RECIPE_NOT_FOUND);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      recipe.user = user;
      await queryRunner.manager.save(recipe);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return recipe;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.error(error);
      throw new InternalServerErrorException(MessageHandler.UNEXPECTED_ERROR);
    }
  }

  async remove(id: string) {
    const recipe = await this.findOne(id);
    await this.recipeRepository.remove(recipe);
  }
}
