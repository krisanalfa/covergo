export enum Currencies {
  HKD = 'HKD',
  USD = 'USD',
  AUD = 'AUD',
}

export const currencies = {
  [Currencies.HKD]: {
    rate: 1,
    symbol: 'HK$',
  },
  [Currencies.USD]: {
    rate: 2,
    symbol: '$',
  },
  [Currencies.AUD]: {
    rate: 3,
    symbol: 'A$',
  },
};
