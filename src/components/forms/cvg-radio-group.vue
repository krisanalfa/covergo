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
      class="block text-sm font-medium text-gray-700"
      v-text="label"
    />
    <fieldset class="mt-1">
      <div class="space-y-2">
        <div
          v-for="option in options"
          :key="option.value"
          class="flex items-center"
        >
          <input
            :id="`${id}-${option.value}`"
            v-model="value"
            :value="option.value"
            type="radio"
            class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
          >
          <label
            :for="`${id}-${option.value}`"
            class="ml-3 block text-sm text-gray-600"
            v-text="option.label"
          />
        </div>
      </div>
    </fieldset>
  </div>
</template>
