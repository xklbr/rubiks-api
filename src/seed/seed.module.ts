import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { UserModule } from 'src/user/user.module';
import { StoresModule } from 'src/stores/stores.module';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UserModule, StoresModule, RecipesModule],
})
export class SeedModule {}
