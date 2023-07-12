import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @ApiOperation({
    operationId: 'getUsersStats',
    summary: 'Get user stats by dashboard',
  })
  @Get()
  getUserStats() {
    return this.dashboardService.getUserByDateCreated();
  }
}
