<script lang="ts" setup>
import {useVModel} from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  options: {
    type: Array as () => {label: string, value: string | number}[],
    default: () => [],
  },
});
const emit = defineEmits(['update:modelValue']);

const value = useVModel(props, 'modelValue', emit);
</script>

<template>
  <div>
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700"
      v-text="label"
    />
    <select
      :id="id"
      v-model="value"
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        v-text="option.label"
      />
    </select>
  </div>
</template>
