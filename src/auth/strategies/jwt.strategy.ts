import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from 'src/user/entities/user.entity';
import { MessageHandler, ValidStatus } from 'src/common/enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new UnauthorizedException(MessageHandler.UNAUTHORIZED_TOKEN);

    if (user.status !== ValidStatus.ACTIVE)
      throw new UnauthorizedException(MessageHandler.UNAUTHORIZED_USER);

    return user;
  }
}
