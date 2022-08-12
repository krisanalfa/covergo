/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {mount, VueWrapper} from '@vue/test-utils';
import CvgSelect from './cvg-select.vue';
import {countries} from '../../data';

describe('CvgSelect', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    // @ts-expect-error: missing emits
    wrapper = mount(
        CvgSelect,
        {
          props: {
            label: 'Country',
            id: 'country',
            modelValue: 0,
            options: countries,
          },
        },
    );
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render correctly', () => {
    const label = wrapper.find('label');
    expect(label.text()).toBe('Country');

    const select = wrapper.find('select');
    expect(select).toBeDefined();
    expect(select.attributes('id')).toBe('country');
    expect(select.attributes('name')).toBe('country');
    expect(select.element.value).toBe('0');

    const options = select.findAll('option');
    expect(options).toHaveLength(countries.length);
    options.forEach((option, index) => {
      expect(option.text()).toBe(countries[index].label);
      expect(option.attributes('value')).toBe(countries[index].value.toString());
      expect(option.element.selected).toBe(countries[index].value === 0);
    });
  });

  it('should be able to handle two way data binding', async () => {
    const input = wrapper.find<HTMLSelectElement>('#country');
    await input.setValue('1');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    const evt = wrapper.emitted('update:modelValue')!;
    expect(evt).toHaveLength(1);
    const [e] = evt;
    expect(e).toEqual([1]);
  });
});
