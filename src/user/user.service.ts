import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateUserDto } from 'src/user/dto';
import { User } from './entities/user.entity';
import { MessageHandler, ValidStatus } from 'src/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(MessageHandler.USERS_NOT_FOUND);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // TODO: Only admin can change role and status

    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user.status !== ValidStatus.ACTIVE)
      throw new BadRequestException(MessageHandler.USER_INVALID_STATUS);

    if (updateUserDto.email === user.email)
      throw new BadRequestException(MessageHandler.EMAIL_ALREADY_EXIST);

    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (user.status === ValidStatus.INACTIVE)
      throw new BadRequestException(MessageHandler.USER_INACTIVE);

    user.status = ValidStatus.INACTIVE;
    this.userRepository.save(user);

    return user;
  }
}
