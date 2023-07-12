import { Provider } from '@nestjs/common';
import * as moment from 'moment-timezone';

export const momentTimezoneProvider: Provider = {
  provide: 'MomentTimezone',
  useFactory: () => {
    moment.tz.setDefault('America/Bogota');
    return moment;
  },
};
