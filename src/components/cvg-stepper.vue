<script lang="ts" setup>
import {useVModel} from '@vueuse/core';

import CvgIconCheck from './icons/solid/cvg-icon-check.vue';

const props = defineProps<{
  modelValue: number
  steps: string[]
}>();
const emit = defineEmits(['update:modelValue']);

const step = useVModel(props, 'modelValue', emit);
</script>

<template>
  <nav aria-label="Progress">
    <ol
      role="list"
      class="border-b-gray-200 border-b divide-y divide-gray-200 md:flex md:divide-y-0"
    >
      <li
        v-for="(definedStep, idx) in steps"
        :key="definedStep"
        class="relative md:flex-1 md:flex"
      >
        <!-- Completed Step -->
        <span
          v-if="idx < step"
          class="group flex items-center w-full"
        >
          <span class="px-6 py-4 flex items-center text-sm font-medium">
            <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full">
              <CvgIconCheck />
            </span>
            <span
              class="ml-4 text-sm font-medium text-gray-900"
              v-text="definedStep"
            />
          </span>
        </span>

        <!-- Current Step -->
        <span
          v-if="idx === step"
          class="px-6 py-4 flex items-center text-sm font-medium"
          aria-current="step"
        >
          <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-blue-600 rounded-full">
            <span
              class="text-blue-600"
              v-text="idx + 1"
            />
          </span>
          <span
            class="ml-4 text-sm font-medium text-blue-600"
            v-text="definedStep"
          />
        </span>

        <!-- Upcoming Step -->
        <span
          v-if="idx > step"
          class="group flex items-center"
        >
          <span class="px-6 py-4 flex items-center text-sm font-medium">
            <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-200 rounded-full">
              <span
                class="text-gray-500"
                v-text="idx + 1"
              />
            </span>
            <span
              class="ml-4 text-sm font-medium text-gray-500"
              v-text="definedStep"
            />
          </span>
        </span>

        <!-- Arrow separator for lg screens and up -->
        <div
          v-if="idx < steps.length - 1"
          class="hidden md:block absolute top-0 right-0 h-full w-5"
          aria-hidden="true"
        >
          <svg
            class="h-full w-full text-gray-200"
            viewBox="0 0 22 80"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 -2L20 40L0 82"
              vector-effect="non-scaling-stroke"
              stroke="currentcolor"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </li>
    </ol>
  </nav>

  <slot :name="`step-${step}`" />

  <slot name="actions" />
</template>
