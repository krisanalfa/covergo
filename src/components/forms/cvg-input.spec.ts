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
          },
        },
    );
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render correctly', async () => {
    const input = wrapper.find<HTMLInputElement>('input');
    expect(input.element.value).toBe('Jane');

    await input.setValue('John');
    expect(input.element.value).toBe('John');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');

    const evt = wrapper.emitted('update:modelValue')!;
    expect(evt).toHaveLength(1);
    const [e] = evt;
    expect(e).toEqual(['John']);
  });
});
