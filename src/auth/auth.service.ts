import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/user/dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { MessageHandler } from 'src/common/enums';
import { LoginAuthDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('StoresService');

  async createAuth(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      if (error.code === '23505')
        throw new HttpException(
          'User is already exist',
          HttpStatus.BAD_REQUEST,
        );

      this.logger.error(error);
      throw new InternalServerErrorException(MessageHandler.UNEXPECTED_ERROR);
    }
  }

  async loginAuth(loginUserDto: LoginAuthDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        fullName: true,
        roles: true,
        status: true,
      },
    });

    if (!user)
      throw new UnauthorizedException(MessageHandler.UNAUTHORIZED_CREDENTIALS);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(MessageHandler.UNAUTHORIZED_CREDENTIALS);

    delete user.password;

    return {
      ...user,
      accessToken: this.getJwtToken({ id: user.id }),
    };
  }

  checkAuthStatus(user: UserEntity) {
    return {
      ...user,
      accessToken: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
