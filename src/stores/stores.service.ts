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

import { Store } from './entities';
import { User } from 'src/user/entities/user.entity';

import { CreateStoreDto, UpdateStoreDto } from 'src/stores/dto';
import { PaginationDto } from 'src/common/dtos';

import { MessageHandler } from 'src/common/enums';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,

    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger('StoresService');

  async create(createStoreDto: CreateStoreDto, user: User) {
    try {
      const { ...storeDetails } = createStoreDto;
      const store = this.storeRepository.create({
        ...storeDetails,
        user: { id: user.id },
      });

      await this.storeRepository.save(store);
      return { ...store };
    } catch (error) {
      if (error.code === '23505')
        throw new HttpException(
          MessageHandler.STORE_ALREADY_EXIST,
          HttpStatus.BAD_REQUEST,
        );

      this.logger.error(error);
      throw new InternalServerErrorException(MessageHandler.UNEXPECTED_ERROR);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 5 } = paginationDto;
    const store = await this.storeRepository.find({
      take: limit,
      skip: offset,
    });

    return store.map(({ ...rest }) => ({
      ...rest,
    }));
  }

  async findOne(id: string) {
    const store = await this.storeRepository.findOneBy({ id });
    if (!store) throw new NotFoundException(MessageHandler.STORE_NOT_FOUND);

    return store;
  }

  async update(id: string, updateStoreDto: UpdateStoreDto, user: User) {
    const { ...toUpdate } = updateStoreDto;
    const store = await this.storeRepository.preload({
      id,
      ...toUpdate,
    });

    if (!store) throw new NotFoundException(MessageHandler.STORE_NOT_FOUND);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      store.user = user;
      await queryRunner.manager.save(store);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return store;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.error(error);
      throw new InternalServerErrorException(MessageHandler.UNEXPECTED_ERROR);
    }
  }

  async remove(id: string) {
    const store = await this.findOne(id);
    await this.storeRepository.remove(store);
  }
}
