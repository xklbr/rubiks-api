import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Store } from 'src/stores/entities';
import { StoresService } from 'src/stores/stores.service';
import { Recipe } from 'src/recipes/entities';
import { RecipesService } from 'src/recipes/recipes.service';

import { seedUsersData, seedStoresData, seedRecipesData } from './data';
import { MessageHandler } from 'src/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly storesService: StoresService,
    private readonly recipesService: RecipesService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,

    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  private readonly logger = new Logger('SEED');

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();

    await this.insertNewStores(adminUser);
    await this.insertNewRecipes(adminUser);
    return 'Seed - Insert executed!';
  }

  private async deleteTables() {
    await this.deleteAllStores();
    await this.deleteAllRecipes();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = seedUsersData.users;

    const users: User[] = [];

    seedUsers.map((user) => {
      user.password = bcrypt.hashSync(user.password, 10);
      user.email = user.email.toLocaleLowerCase().trim();
      this.userRepository.create(user);
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

  private async insertNewStores(user: User) {
    await this.deleteAllStores();
    await this.deleteAllRecipes();

    const stores = seedStoresData.stores;
    const recipes = seedRecipesData.recipes;

    const insertPromises = [];

    stores.forEach((store) =>
      insertPromises.push(this.storesService.create(store, user)),
    );

    recipes.forEach((recipe) =>
      insertPromises.push(this.recipesService.create(recipe, user)),
    );

    await Promise.all(insertPromises);

    return true;
  }

  private async insertNewRecipes(user: User) {
    await this.deleteAllRecipes();

    const recipes = seedRecipesData.recipes;

    const insertPromises = [];

    recipes.forEach((recipe) =>
      insertPromises.push(this.recipesService.create(recipe, user)),
    );

    await Promise.all(insertPromises);

    return true;
  }

  async deleteAllStores() {
    const query = this.storeRepository.createQueryBuilder('store');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(MessageHandler.UNEXPECTED_ERROR);
    }
  }

  async deleteAllRecipes() {
    const query = this.recipeRepository.createQueryBuilder('recipe');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(MessageHandler.UNEXPECTED_ERROR);
    }
  }
}
