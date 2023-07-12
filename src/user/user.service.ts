import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto, UserDto } from './dto/index';
import { UserEntity } from './entities/user.entity';
import { MessageHandler, ValidStatus } from 'src/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserDto[]> {
    return this.userRepository.find({
      where: { status: ValidStatus.ACTIVE },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(MessageHandler.USERS_NOT_FOUND);

    return user;
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (user) throw new BadRequestException(MessageHandler.EMAIL_ALREADY_EXIST);

    const newUser = this.userRepository.create({
      ...userDto,
      password: Math.random().toString(36).substring(2),
    });
    await this.userRepository.save(newUser);

    return newUser;
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
      user.status = ValidStatus.DISABLED;
      await this.userRepository.save(user);

      this.userRepository.softDelete({ id });

      return true;
    }
    return false;
  }

  async getTotalUserStatsByMonth(): Promise<any> {
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);
    endDate.setUTCHours(23, 59, 0, 0);

    const createdLast30Days = await this.userRepository
      .createQueryBuilder('users')
      .where('created_at >= :startDate', { startDate })
      .andWhere('created_at <= :endDate', { endDate })
      .andWhere('status = :status', { status: ValidStatus.ACTIVE })
      .getCount();

    const updatedLast30Days = await this.userRepository
      .createQueryBuilder('users')
      .where('updated_at >= :startDate', { startDate })
      .andWhere('updated_at <= :endDate', { endDate })
      .andWhere('updated_at <> created_at')
      .andWhere('status = :status', { status: ValidStatus.ACTIVE })
      .getCount();

    const deletedLast30Days = await this.userRepository
      .createQueryBuilder('users')
      .where('deleted_at >= :startDate', { startDate })
      .andWhere('deleted_at <= :endDate', { endDate })
      .andWhere('status = :status', { status: ValidStatus.DISABLED })
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
