import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
