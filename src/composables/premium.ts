/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {computed, Ref} from 'vue';
import type {User} from '@krisanalfa/covergo';
import {countries, currencies, plans} from '../data';

const BASE_PRICE = 10;

export const usePremium = (user: Ref<User>) => {
  const country = computed(() => countries.find((c) => c.value === user.value.country)!);
  const plan = computed(() => plans.find((p) => p.value === user.value.plan)!);
  const currency = computed(() => currencies[country.value.currency]);
  const formatter = computed(() => new Intl.NumberFormat(
      country.value.locale,
      {style: 'currency', currency: country.value.currency},
  ));

  const basePremium = computed(() => user.value.age * BASE_PRICE);
  const basePremiumPrice = computed(() => basePremium.value * currency.value.rate);
  const formattedBasePremiumPrice = computed(() => formatter.value.format(basePremiumPrice.value));

  const planAmount = computed(() => basePremium.value * plan.value.multiplier);
  const planPrice = computed(() => planAmount.value * currency.value.rate);
  const formattedPlanPrice = computed(() => formatter.value.format(planPrice.value));

  const premium = computed(() => basePremium.value + planAmount.value);
  const premiumPrice = computed(() => premium.value * currency.value.rate);
  const formattedPremiumPrice = computed(() => formatter.value.format(premiumPrice.value));

  return {
    /**
     * The selected plan.
     */
    plan,
    /**
     * The selected country.
     */
    country,
    /**
     * The selected currency.
     */
    currency,
    /**
     * Number formatter for the selected currency.
     */
    formatter,

    /**
     * Base premium:
     * The base premium **BEFORE** "Plan price" is added; **BEFORE** currency rate is applied.
     */
    basePremium,
    /**
     * Base premium price:
     * The base premium **BEFORE** "Plan price" is added; **AFTER** currency rate is applied.
     */
    basePremiumPrice,
    /**
     * The formatted base premium price.
     */
    formattedBasePremiumPrice,

    /**
     * Plan amount:
     * The plan price is the amount of plan the customer has selected, **BEFORE** currency rate is applied. Here's the formula:
     * | Plan     | Price                           |
     * | -------- | ------------------------------- |
     * | Standard | +0% of the base premium amount  |
     * | Safe     | +50% of the base premium amount |
     * | Extra    | +75% of the base premium amount |
     */
    planAmount,
    /**
     * Plan price:
     * The plan price is the amount of plan the customer has selected **AFTER** currency rate is applied.
     */
    planPrice,
    /**
     * The formatted plan price.
     */
    formattedPlanPrice,

    /**
     * Premium:
     * The premium **AFTER** "Plan price" is added; **BEFORE** currency rate is applied.
     */
    premium,
    /**
     * Premium price:
     * The premium **AFTER** "Plan price" is added; **AFTER** currency rate is applied.
     */
    premiumPrice,
    /**
     * The formatted premium price.
     */
    formattedPremiumPrice,
  };
};
