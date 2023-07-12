import { Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';

@Injectable()
export class DashboardService {
  constructor(private userService: UserService) {}

  async getUserByDateCreated(): Promise<number> {
    return this.userService.getTotalUserStatsByMonth();
  }
}
