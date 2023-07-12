import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  jobTitle: string;

  @ApiProperty()
  @IsOptional()
  roles?: string[];

  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
