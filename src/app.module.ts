import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoresModule } from './stores/stores.module';
import { RecipesModule } from './recipes/recipes.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmConfigModule } from './config/typeorm/typeorm.module';
import { Store } from './stores/entities';
import { Recipe } from './recipes/entities';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';
import { SharedModule } from './common/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Store, Recipe]),
    StoresModule,
    RecipesModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    SeedModule,
    SharedModule,
    DashboardModule,
  ],
})
export class AppModule {}
