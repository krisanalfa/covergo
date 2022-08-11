<script lang="ts" setup>
import {User} from '@krisanalfa/covergo';
import {useVModel} from '@vueuse/core';
import {usePremium} from '../composables/premium';

const props = defineProps<{modelValue: User}>();
const emit = defineEmits([]);
const user = useVModel(props, 'modelValue', emit);
const {
  country,
  formattedBasePremiumPrice,
  plan,
  formattedPlanPrice,
  formattedPremiumPrice,
} = usePremium(user);
</script>

<template>
  <dl class="space-y-6">
    <div class="flex items-center justify-between">
      <dt class="text-sm">
        Name
      </dt>
      <dd class="text-sm font-medium text-gray-900">
        <span
          id="summary-name"
          v-text="user.name"
        />
      </dd>
    </div>
    <div class="flex items-center justify-between">
      <dt class="text-sm">
        Country
      </dt>
      <dd class="text-sm font-medium text-gray-900">
        <span
          id="summary-country"
          v-text="country.label"
        />
      </dd>
    </div>
    <div class="flex items-center justify-between">
      <dt class="text-sm">
        Age
      </dt>
      <dd class="text-sm font-medium text-gray-900">
        <span
          id="summary-age"
          v-text="user.age"
        />
      </dd>
    </div>

    <div class="flex items-center justify-between border-t border-gray-200 pt-6">
      <dt class="text-sm">
        Base premium
      </dt>
      <dd class="text-sm font-medium text-gray-900">
        <span
          id="summary-base-premium"
          v-text="formattedBasePremiumPrice"
        />
      </dd>
    </div>
    <div class="flex items-center justify-between">
      <dt class="text-sm">
        Selected plan
        <span
          id="summary-selected-plan"
          class="ml-2 rounded-full bg-blue-200 text-xs text-gray-700 py-0.5 px-2 tracking-wide"
          v-text="plan.label"
        />
      </dt>
      <dd class="text-sm font-medium text-gray-900">
        +<span
          id="summary-plan-price"
          v-text="formattedPlanPrice"
        />
      </dd>
    </div>

    <div class="flex items-center justify-between border-t border-gray-200 pt-6">
      <dt class="text-base font-medium">
        Total
      </dt>
      <dd class="text-base font-medium text-gray-900">
        <span
          id="summary-premium"
          v-text="formattedPremiumPrice"
        />
      </dd>
    </div>
  </dl>
</template>
