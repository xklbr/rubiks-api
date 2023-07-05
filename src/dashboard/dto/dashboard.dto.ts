import { ApiProperty } from '@nestjs/swagger';

export class DashboardDto {
  @ApiProperty()
  data: string | string[] | null;
}
