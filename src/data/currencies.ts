import {Currency} from '@krisanalfa/covergo';

import {Currencies} from '../constants';

export const currencies: Record<string, Currency> = {
  [Currencies.HKD]: {
    rate: 1,
  },
  [Currencies.USD]: {
    rate: 2,
  },
  [Currencies.AUD]: {
    rate: 3,
  },
};
