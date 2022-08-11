import {ref} from 'vue';
import {User} from '@krisanalfa/covergo';

import {usePremium} from './premium';

describe('usePremium', () => {
  it('should return the premium price ("Standard" plan)(HK)', () => {
    const HKPremium = usePremium(ref<User>({
      name: 'John Doe',
      age: 20,
      country: 0,
      plan: 0,
    }));
    expect(HKPremium.basePremium.value).toBe(200);
    expect(HKPremium.basePremiumPrice.value).toBe(200);
    expect(HKPremium.planAmount.value).toBe(0);
    expect(HKPremium.planPrice.value).toBe(0);
    expect(HKPremium.premium.value).toBe(200);
    expect(HKPremium.premiumPrice.value).toBe(200);
  });

  it('should return the premium price ("Standard" plan)(USA)', () => {
    const USAPremium = usePremium(ref<User>({
      name: 'John Doe',
      age: 20,
      country: 1,
      plan: 0,
    }));
    expect(USAPremium.basePremium.value).toBe(200);
    expect(USAPremium.basePremiumPrice.value).toBe(400);
    expect(USAPremium.planAmount.value).toBe(0);
    expect(USAPremium.planPrice.value).toBe(0);
    expect(USAPremium.premium.value).toBe(200);
    expect(USAPremium.premiumPrice.value).toBe(400);
  });

  it('should return the premium price ("Standard" plan)(AU)', () => {
    const AUPremium = usePremium(ref<User>({
      name: 'John Doe',
      age: 20,
      country: 2,
      plan: 0,
    }));
    expect(AUPremium.basePremium.value).toBe(200);
    expect(AUPremium.basePremiumPrice.value).toBe(600);
    expect(AUPremium.planAmount.value).toBe(0);
    expect(AUPremium.planPrice.value).toBe(0);
    expect(AUPremium.premium.value).toBe(200);
    expect(AUPremium.premiumPrice.value).toBe(600);
  });

  it('should return the premium price ("Safe" plan)(HK)', () => {
    const HKPremium = usePremium(ref<User>({
      name: 'John Doe',
      age: 20,
      country: 0,
      plan: 1,
    }));
    expect(HKPremium.basePremium.value).toBe(200);
    expect(HKPremium.basePremiumPrice.value).toBe(200);
    expect(HKPremium.planAmount.value).toBe(100);
    expect(HKPremium.planPrice.value).toBe(100);
    expect(HKPremium.premium.value).toBe(300);
    expect(HKPremium.premiumPrice.value).toBe(300);
  });

  it('should return the premium price ("Safe" plan)(USA)', () => {
    const USAPremium = usePremium(ref<User>({
      name: 'John Doe',
      age: 20,
      country: 1,
      plan: 1,
    }));
    expect(USAPremium.basePremium.value).toBe(200);
    expect(USAPremium.basePremiumPrice.value).toBe(400);
    expect(USAPremium.planAmount.value).toBe(100);
    expect(USAPremium.planPrice.value).toBe(200);
    expect(USAPremium.premium.value).toBe(300);
    expect(USAPremium.premiumPrice.value).toBe(600);
  });

  it('should return the premium price ("Safe" plan)(AU)', () => {
    const AUPremium = usePremium(ref<User>({
      name: 'John Doe',
      age: 20,
      country: 2,
      plan: 1,
    }));
    expect(AUPremium.basePremium.value).toBe(200);
    expect(AUPremium.basePremiumPrice.value).toBe(600);
    expect(AUPremium.planAmount.value).toBe(100);
    expect(AUPremium.planPrice.value).toBe(300);
    expect(AUPremium.premium.value).toBe(300);
    expect(AUPremium.premiumPrice.value).toBe(900);
  });

  it('should return the premium price ("Super Safe" plan)(HK)', () => {
    const HKPremium = usePremium(ref<User>({
      name: 'John Doe',
      age: 20,
      country: 0,
      plan: 2,
    }));
    expect(HKPremium.basePremium.value).toBe(200);
    expect(HKPremium.basePremiumPrice.value).toBe(200);
    expect(HKPremium.planAmount.value).toBe(150);
    expect(HKPremium.planPrice.value).toBe(150);
    expect(HKPremium.premium.value).toBe(350);
    expect(HKPremium.premiumPrice.value).toBe(350);
  });

  it('should return the premium price ("Super Safe" plan)(USA)', () => {
    const USAPremium = usePremium(ref<User>({
      name: 'John Doe',
      age: 20,
      country: 1,
      plan: 2,
    }));
    expect(USAPremium.basePremium.value).toBe(200);
    expect(USAPremium.basePremiumPrice.value).toBe(400);
    expect(USAPremium.planAmount.value).toBe(150);
    expect(USAPremium.planPrice.value).toBe(300);
    expect(USAPremium.premium.value).toBe(350);
    expect(USAPremium.premiumPrice.value).toBe(700);
  });

  it('should return the premium price ("Super Safe" plan)(AU)', () => {
    const AUPremium = usePremium(ref<User>({
      name: 'John Doe',
      age: 20,
      country: 2,
      plan: 2,
    }));
    expect(AUPremium.basePremium.value).toBe(200);
    expect(AUPremium.basePremiumPrice.value).toBe(600);
    expect(AUPremium.planAmount.value).toBe(150);
    expect(AUPremium.planPrice.value).toBe(450);
    expect(AUPremium.premium.value).toBe(350);
    expect(AUPremium.premiumPrice.value).toBe(1050);
  });
});
