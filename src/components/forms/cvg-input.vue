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
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
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
    <div class="mt-1">
      <input
        :id="id"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
      >
    </div>
  </div>
</template>
