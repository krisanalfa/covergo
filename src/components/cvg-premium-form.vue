<script lang="ts" setup>
import {computed} from 'vue';
import {useVModel} from '@vueuse/core';

import {usePremium} from '../composables/premium';
import {countries, plans} from '../data';
import CvgInput from './forms/cvg-input.vue';
import CvgSelect from './forms/cvg-select.vue';
import CvgRadioGroup from './forms/cvg-radio-group.vue';

const props = defineProps<{
  modelValue: {
    name: string
    age: number
    country: number
    plan: number
  }
}>();
const emit = defineEmits([
  'update:modelValue',
  'submit',
]);

const user = useVModel(props, 'modelValue', emit);
const {
  basePremiumPrice,
  premiumPrice,
  formattedPremiumPrice,
  formatter,
} = usePremium(user);
const formattedPlans = computed(
    () => plans.map(
        (p) => {
          const percent = p.multiplier * 100;
          if (!percent) return p;

          const diff = (basePremiumPrice.value * percent) / 100;

          return {
            ...p,
            label: diff ?
              `${p.label} (+${formatter.value.format(diff)}, ${percent.toFixed(0)}%)` :
              `${p.label} (+${percent.toFixed(0)}%)`,
          };
        },
    ),
);
</script>

<template>
  <form class="space-y-6">
    <CvgInput
      id="name"
      v-model="user.name"
      label="Name"
      placeholder="Your full name"
    />

    <CvgInput
      id="age"
      v-model.number="user.age"
      label="Age"
      placeholder="Your age"
    />

    <CvgSelect
      id="location"
      v-model.number="user.country"
      label="Where do you live"
      :options="countries"
    />

    <CvgRadioGroup
      id="plan"
      v-model.number="user.plan"
      label="Choose your plan"
      :options="formattedPlans"
    />

    <div v-if="premiumPrice">
      <h1 class="text-2xl font-bold mt-10 sm:text-3xl sm:tracking-tight">
        <span class="text-gray-900">Your premium is </span>
        <span
          class="font-extrabold text-blue-600"
          v-text="formattedPremiumPrice"
        />
      </h1>
    </div>
  </form>
</template>
