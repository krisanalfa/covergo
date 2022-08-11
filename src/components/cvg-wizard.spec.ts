import {mount, VueWrapper} from '@vue/test-utils';

import CvgWizard from './cvg-wizard.vue';

describe('CvgWizard', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(CvgWizard);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();

    const wizard = wrapper.getComponent(CvgWizard);
    expect(wizard).toBeDefined();
    expect(wizard.vm.user.name).toBe('');
    expect(wizard.vm.user.age).toBe(0);
    expect(wizard.vm.user.country).toBe(0);
    expect(wizard.vm.user.plan).toBe(0);
    expect(wizard.vm.step).toBe(0);
    expect(wizard.vm.steps).toHaveLength(3);
  });

  it('should render correctly ("Welcome" screen)', () => {
    expect(wrapper.text()).toContain('Hello, there!');
    expect(wrapper.get('#start-button').text()).toContain('Start');
  });

  it('should render correctly ("Form" screen)', async () => {
    const wizard = wrapper.getComponent(CvgWizard);
    expect(wizard.vm.step).toBe(0);
    await wrapper.get('#start-button').trigger('click');
    expect(wizard.vm.step).toBe(1);
    expect(wrapper.text()).toContain('Tell us about yourself');

    // Age is 0, the overview should be invisible
    expect(() => wrapper.get('#premium-overview')).toThrow();

    const inputName = wrapper.get<HTMLInputElement>('input#name');
    // Default is empty string
    expect(inputName.element.value).toBe('');
    await inputName.setValue('John Doe');
    expect(inputName.element.value).toBe('John Doe');
    expect(wizard.vm.user.name).toBe('John Doe');

    const inputAge = wrapper.get<HTMLInputElement>('input#age');
    // Default is 0
    expect(inputAge.element.value).toBe('0');

    const inputLocation = wrapper.get<HTMLSelectElement>('select#location');
    // Default is 0
    expect(inputLocation.element.value).toBe('0');

    // "Standard" plan is selected by default, +0%
    const standardPlanRadio = wrapper.get<HTMLInputElement>('input#plan-0');
    // Default is checked
    expect(standardPlanRadio.element.checked).toBe(true);
    // Set the appropriate age
    await inputAge.setValue('20');
    expect(inputAge.element.value).toBe('20');
    expect(wizard.vm.user.age).toBe(20);
    // To HKD: x1
    const premiumOverview = wrapper.get('#premium-overview');
    expect(premiumOverview.text()).toContain('HK$200.00');
    // To USD: x2
    await inputLocation.setValue('1');
    expect(inputLocation.element.value).toBe('1');
    expect(premiumOverview.text()).toContain('$400.00');
    // To AUD: x3
    await inputLocation.setValue('2');
    expect(inputLocation.element.value).toBe('2');
    expect(premiumOverview.text()).toContain('$600.00');

    // Change plan to "Safe", +50%
    const safePlanRadio = wrapper.get<HTMLInputElement>('input#plan-1');
    await safePlanRadio.setValue(true);
    expect(safePlanRadio.element.checked).toBe(true);
    expect(wizard.vm.user.plan).toBe(1);
    // Back to HKD: x1
    await inputLocation.setValue('0');
    expect(premiumOverview.text()).toContain('HK$300.00');
    // To USD: x2
    await inputLocation.setValue('1');
    expect(premiumOverview.text()).toContain('$600.00');
    // To AUD: x3
    await inputLocation.setValue('2');
    expect(premiumOverview.text()).toContain('$900.00');

    // Change plan to "Super Safe", +75%
    const superSafePlanRadio = wrapper.get<HTMLInputElement>('input#plan-2');
    await superSafePlanRadio.setValue(true);
    expect(superSafePlanRadio.element.checked).toBe(true);
    expect(wizard.vm.user.plan).toBe(2);
    // Back to HKD: x1
    await inputLocation.setValue('0');
    expect(premiumOverview.text()).toContain('HK$350.00');
    // To USA: x2
    await inputLocation.setValue('1');
    expect(premiumOverview.text()).toContain('$700.00');
    // To AUD: x3
    await inputLocation.setValue('2');
    expect(premiumOverview.text()).toContain('$1,050.00');
  });

  it('can go next to "Summary" screen using correct information', async () => {
    const wizard = wrapper.getComponent(CvgWizard);
    expect(wizard.vm.step).toBe(0);
    await wrapper.get('#start-button').trigger('click');
    expect(wizard.vm.step).toBe(1);
    await wrapper.get<HTMLInputElement>('input#name').setValue('John Doe');
    await wrapper.get<HTMLInputElement>('input#age').setValue('20');
    await wrapper.get('#next-button').trigger('click');
    expect(wizard.vm.step).toBe(2);

    expect(wrapper.text()).toContain('Summary');
    expect(wrapper.get('#summary-name').text()).toContain('John Doe');
    expect(wrapper.get('#summary-country').text()).toContain('Hong Kong');
    expect(wrapper.get('#summary-age').text()).toContain('20');
    expect(wrapper.get('#summary-base-premium').text()).toContain('HK$200.00');
    expect(wrapper.get('#summary-plan-price').text()).toContain('HK$0.00');
    expect(wrapper.get('#summary-premium').text()).toContain('HK$200.00');

    const buyButton = wrapper.get('button#buy-button');
    expect(buyButton.isVisible()).toBe(true);
    await buyButton.trigger('click');

    // Back to "Welcome"
    expect(wrapper.text()).toContain('Hello, there!');
    // Reset
    expect(wizard.vm.step).toBe(0);
    expect(wizard.vm.user.name).toBe('');
    expect(wizard.vm.user.age).toBe(0);
    expect(wizard.vm.user.country).toBe(0);
    expect(wizard.vm.user.plan).toBe(0);
  });

  it('can go back from "Summary" screen to "Welcome screen"', async () => {
    const wizard = wrapper.getComponent(CvgWizard);
    expect(wizard.vm.step).toBe(0);
    await wrapper.get('#start-button').trigger('click');
    expect(wizard.vm.step).toBe(1);
    expect(wrapper.text()).toContain('Tell us about yourself');
    await wrapper.get('#back-button').trigger('click');
    expect(wizard.vm.step).toBe(0);
    // Back to "Welcome"
    expect(wrapper.text()).toContain('Hello, there!');
    // Reset
    expect(wizard.vm.step).toBe(0);
    expect(wizard.vm.user.name).toBe('');
    expect(wizard.vm.user.age).toBe(0);
    expect(wizard.vm.user.country).toBe(0);
    expect(wizard.vm.user.plan).toBe(0);
  });

  it('can go next to "Summary" screen using correct information', async () => {
    const wizard = wrapper.getComponent(CvgWizard);
    expect(wizard.vm.step).toBe(0);
    await wrapper.get('#start-button').trigger('click');
    expect(wizard.vm.step).toBe(1);
    await wrapper.get<HTMLInputElement>('input#name').setValue('John Doe');
    await wrapper.get<HTMLInputElement>('input#age').setValue('101');
    await wrapper.get('#next-button').trigger('click');
    expect(wizard.vm.step).toBe(2);

    expect(wrapper.text()).toContain('Ooops');

    const buyButton = wrapper.get('button#restart-button');
    expect(buyButton.isVisible()).toBe(true);
    await buyButton.trigger('click');

    // Back to "Welcome"
    expect(wrapper.text()).toContain('Hello, there!');
    // Reset
    expect(wizard.vm.step).toBe(0);
    expect(wizard.vm.user.name).toBe('');
    expect(wizard.vm.user.age).toBe(0);
    expect(wizard.vm.user.country).toBe(0);
    expect(wizard.vm.user.plan).toBe(0);
  });
});
