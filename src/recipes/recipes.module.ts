import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe } from './entities';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
  imports: [TypeOrmModule.forFeature([Recipe]), AuthModule],
  exports: [RecipesService, TypeOrmModule],
})
export class RecipesModule {}
