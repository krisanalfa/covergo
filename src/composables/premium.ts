/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {computed, Ref} from 'vue';
import {countries, currencies, plans} from '../data';

const BASE_PRICE = 10;

interface User {
  age: number;
  country: number;
  plan: number;
}

export const usePremium = (user: Ref<User>) => {
  const country = computed(() => countries.find((c) => c.value === user.value.country)!);
  const plan = computed(() => plans.find((p) => p.value === user.value.plan)!);
  const currency = computed(() => currencies[country.value.currency]);

  const basePremium = computed(() => user.value.age * BASE_PRICE);
  const premium = computed(() => basePremium.value * plan.value.multiplier);

  const basePremiumPrice = computed(() => basePremium.value * currency.value.rate);
  const premiumPrice = computed(() => premium.value * currency.value.rate);
  const priceDiff = computed(() => {
    const percent = Math.abs((1 - plan.value.multiplier) * 100);

    return (basePremiumPrice.value * percent) / 100;
  });

  const formatter = computed(() => new Intl.NumberFormat(
      country.value.locale,
      {style: 'currency', currency: country.value.currency},
  ));

  const formattedBasePremiumPrice = computed(() => formatter.value.format(basePremiumPrice.value));
  const formattedPremiumPrice = computed(() => formatter.value.format(premiumPrice.value));
  const formattedPriceDiff = computed(() => formatter.value.format(priceDiff.value));

  return {
    plan,
    country,

    formatter,
    basePremium,
    basePremiumPrice,
    premium,
    premiumPrice,
    priceDiff,

    formattedBasePremiumPrice,
    formattedPriceDiff,
    formattedPremiumPrice,
  };
};
