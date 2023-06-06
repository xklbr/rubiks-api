import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { validatePassword } from 'src/common/actions';
import { MessageHandler } from 'src/common/enums';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(validatePassword, {
    message: MessageHandler.PASSWORD_INVALID,
  })
  password: string;
}
