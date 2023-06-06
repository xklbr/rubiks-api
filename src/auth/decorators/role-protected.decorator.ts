import { SetMetadata } from '@nestjs/common';
import { MetaRoles, ValidRoles } from 'src/common/enums';

export const RoleProtected = (...args: ValidRoles[]) =>
  SetMetadata(MetaRoles.ROLES, args);
