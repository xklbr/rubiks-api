import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [TypeOrmModule.forFeature([Store]), AuthModule],
  exports: [StoresService, TypeOrmModule],
})
export class StoresModule {}
