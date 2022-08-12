/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {mount, VueWrapper} from '@vue/test-utils';
import CvgRadioGroup from './cvg-radio-group.vue';
import {plans} from '../../data';

describe('CvgRadioGroup', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    // @ts-expect-error: missing emits
    wrapper = mount(
        CvgRadioGroup,
        {
          props: {
            label: 'Plan',
            id: 'plan',
            modelValue: 0,
            options: plans,
          },
        },
    );
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render correctly', async () => {
    const label = wrapper.find('label');
    expect(label.text()).toBe('Plan');

    const fieldsets = wrapper.findAll('fieldset > div > div');
    expect(fieldsets).toHaveLength(plans.length);
    fieldsets.forEach((fieldset, index) => {
      const label = fieldset.find('label');
      expect(label.text()).toBe(plans[index].label);
      expect(label.attributes('for')).toBe(`plan-${index}`);

      const input = fieldset.find<HTMLInputElement>('input');
      expect(input).toBeDefined();
      expect(input.attributes('id')).toBe(`plan-${index}`);
      expect(input.attributes('type')).toBe('radio');
      expect(input.attributes('name')).toBe('plan');
      expect(input.attributes('value')).toBe(plans[index].value.toString());
      expect(input.element.checked).toBe(plans[index].value === 0);
    });
  });

  it('should be able to handle two way data binding', async () => {
    const input = wrapper.find<HTMLInputElement>('#plan-1');
    await input.setValue(true);

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    const evt = wrapper.emitted('update:modelValue')!;
    expect(evt).toHaveLength(1);
    const [e] = evt;
    expect(e).toEqual([1]);
  });
});
