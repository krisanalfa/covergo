/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {mount, VueWrapper} from '@vue/test-utils';
import CvgInput from './cvg-input.vue';

describe('CvgInput', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    // @ts-expect-error: missing emits
    wrapper = mount(
        CvgInput,
        {
          props: {
            label: 'Name',
            id: 'name',
            modelValue: 'Jane',
            placeholder: 'Enter your name',
          },
        },
    );
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render correctly', () => {
    const label = wrapper.find('label');
    expect(label.text()).toBe('Name');
    expect(label.attributes('for')).toBe('name');

    const input = wrapper.find<HTMLInputElement>('input');

    expect(input.element.value).toBe('Jane');
    expect(input.element.id).toBe('name');
    expect(input.element.name).toBe('name');
    expect(input.attributes('type')).toBe('text');
    expect(input.attributes('placeholder')).toBe('Enter your name');
  });

  it('should be able to handle two way data binding', async () => {
    const input = wrapper.find<HTMLInputElement>('input');

    await input.setValue('John');
    expect(input.element.value).toBe('John');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');

    const evt = wrapper.emitted('update:modelValue')!;
    expect(evt).toHaveLength(1);
    const [e] = evt;
    expect(e).toEqual(['John']);
  });
});
