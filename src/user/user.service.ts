import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateUserDto, UserDto } from './dto/index';
import { UserEntity } from './entities/user.entity';
import { MessageHandler, ValidStatus } from 'src/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(MessageHandler.USERS_NOT_FOUND);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    // const user = await this.userRepository.findOne({ where: { id: id } });
    // if (user.status !== ValidStatus.ACTIVE)
    //   throw new BadRequestException(MessageHandler.USER_INVALID_STATUS);

    // if (updateUserDto.email === user.email)
    //   throw new BadRequestException(MessageHandler.EMAIL_ALREADY_EXIST);

    await this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async disable(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      user.status = ValidStatus.INACTIVE;
      await this.userRepository.save(user);

      this.userRepository.softDelete({ id });

      return true;
    }
    return false;
  }

  async getTotalUserByDateCreated(days: number): Promise<any> {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getTime() - days * 24 * 60 * 60 * 1000,
    );

    const createdLast30Days = await this.userRepository
      .createQueryBuilder('users')
      .where('created_at >= :startDate', { startDate })
      .andWhere('created_at <= :currentDate', { currentDate })
      .andWhere('status = :status', { status: ValidStatus.ACTIVE })
      .getCount();

    const updatedLast30Days = await this.userRepository
      .createQueryBuilder('users')
      .where('updated_at >= :startDate', { startDate })
      .andWhere('updated_at <= :currentDate', { currentDate })
      .andWhere('status = :status', { status: ValidStatus.ACTIVE })
      .getCount();

    const deletedLast30Days = await this.userRepository
      .createQueryBuilder('users')
      .where('deleted_at >= :startDate', { startDate })
      .andWhere('deleted_at <= :currentDate', { currentDate })
      .andWhere('status = :status', { status: ValidStatus.INACTIVE })
      .getCount();

    return [
      {
        title: 'Users last 30 days',
        total: createdLast30Days,
      },
      {
        title: 'Updated users last 30 days',
        total: updatedLast30Days,
      },
      {
        title: 'Disabled users last 30 days',
        total: deletedLast30Days,
      },
    ];
  }
}
