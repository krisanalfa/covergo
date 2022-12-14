<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {User} from '@krisanalfa/covergo';

import CvgIconCheck from './icons/outlined/cvg-icon-check.vue';
import CvgIconCart from './icons/outlined/cvg-icon-cart.vue';
import CvgIconRefresh from './icons/outlined/cvg-icon-refresh.vue';
import CvgIconArrowLeft from './icons/solid/cvg-arrow-left.vue';
import CvgIconArrowRight from './icons/solid/cvg-arrow-right.vue';
import CvgCenterContent from './cvg-center-content.vue';
import CvgPanel from './cvg-panel.vue';
import CvgStepper from './cvg-stepper.vue';
import CvgPremiumForm from './cvg-premium-form.vue';
import CvgPremiumSummary from './cvg-premium-summary.vue';

const benefits = [
  'Easy registration',
  'No credit card information required',
  'Absolutely anonymous',
  'Super quick process',
  'No tracking and no spam',
];

const error = ref<string>();
const step = ref(0);
const user = ref<User>({
  name: '',
  age: 0,
  country: 0,
  plan: 0,
});

const isInvalid = computed(() => !user.value.name || !user.value.age);
const hasError = computed(() => step.value === 2 && error.value);
const steps = computed(
    () => hasError.value ?
      [] :
      [
        'Welcome',
        'Your information',
        'Summary',
      ],
);

watch(
    () => user.value.age,
    (age) => {
      if (age > 100) {
        error.value = 'Your age is over our acceptable limit. We are sorry but we cannot insure you now.';
      } else {
        error.value = undefined;
      }
    },
);

const scrollTop = () => {
  window.scroll({top: 0, behavior: 'smooth'});
};
const reset = () => {
  user.value = {
    name: '',
    age: 0,
    country: 0,
    plan: 0,
  };
  error.value = undefined;
  step.value = 0;
  scrollTop();
};
const next = () => {
  step.value++;
  scrollTop();
};
const back = () => {
  step.value--;
  scrollTop();
};

defineExpose({
  step,
  steps,
  user,
  error,
});
</script>

<template>
  <CvgCenterContent class="bg-blue-900 py-10 lg:py-0">
    <img
      src="/logo.svg"
      alt="CoverGo"
      class="mx-auto"
    >

    <CvgPanel class="mt-6">
      <!-- /* c8 ignore start */ -->
      <CvgStepper
        v-model="step"
        :steps="steps"
      >
        <!-- /* c8 ignore end */ -->
        <!-- Welcome -->
        <template #step-0>
          <div class="px-6 pt-12 pb-10">
            <h3 class="text-center text-3xl font-semibold text-gray-900 sm:-mx-6">
              Hello, there!
            </h3>
            <div class="mt-4 text-center">
              <span class="text-xl tracking-tight text-gray-700 sm:text-xl">
                Let's buy some insurance. It's going to take only a few steps.
              </span>
            </div>
          </div>
          <div class="border-t-2 border-gray-100 pt-10 pb-8 px-6 bg-gray-100 sm:px-10 sm:py-10">
            <ul
              role="list"
              class="space-y-4"
            >
              <li
                v-for="benefit in benefits"
                :key="benefit"
                class="flex items-start"
              >
                <div class="flex-shrink-0">
                  <CvgIconCheck />
                </div>
                <p
                  class="ml-3 text-base font-medium text-gray-500"
                  v-text="benefit"
                />
              </li>
            </ul>
          </div>
        </template>

        <!-- Premium form -->
        <template #step-1>
          <div class="px-6 pt-12 pb-10">
            <h3 class="text-center text-3xl font-semibold text-gray-900 sm:-mx-6">
              Tell us about yourself
            </h3>
          </div>
          <div class="border-t-2 border-gray-100 pt-10 pb-8 px-6 bg-gray-100 sm:px-10 sm:py-10">
            <CvgPremiumForm
              v-model="user"
              @submit="next"
            />
          </div>
        </template>

        <!-- Summary / error page -->
        <template #step-2>
          <div class="px-6 pt-12 pb-10">
            <h3 class="text-center text-3xl font-semibold text-gray-900 sm:-mx-6">
              <span v-if="hasError">Ooops!</span>
              <span v-else>Confirm your order summary</span>
            </h3>
            <div
              v-if="hasError"
              class="mt-4 text-center"
            >
              <span
                class="text-xl tracking-tight text-gray-700 sm:text-xl"
                v-text="error"
              />
            </div>
          </div>
          <div
            v-if="!hasError"
            class="border-t-2 border-gray-100 pt-10 pb-8 px-6 bg-gray-100 sm:px-10 sm:py-10"
          >
            <CvgPremiumSummary v-model="user" />
          </div>
        </template>

        <template #actions>
          <div class="border-t-2 border-gray-100 pt-10 pb-8 px-6 bg-white sm:px-10 sm:py-10">
            <button
              v-if="step === 0"
              id="start-button"
              class="btn btn--primary"
              @click="next"
            >
              Start
            </button>

            <!-- Last step, has error -->
            <button
              v-else-if="hasError"
              id="restart-button"
              class="btn btn--secondary"
              @click="reset"
            >
              <CvgIconRefresh />
              <span>Start over</span>
            </button>

            <!-- 2nd / 3rd step -->
            <div
              v-else
              class="grid grid-cols-2 gap-4"
            >
              <!-- Back button, 2nd / 3rd step only -->
              <button
                id="back-button"
                class="btn btn--secondary"
                @click="back"
              >
                <CvgIconArrowLeft />
                <span>Back</span>
              </button>

              <!-- Buy button, 3rd step only -->
              <button
                v-if="step === 2"
                id="buy-button"
                class="btn btn--primary"
                @click="reset"
              >
                <span>Buy</span>
                <CvgIconCart />
              </button>

              <!-- 2nd step only -->
              <button
                v-else
                id="next-button"
                class="btn btn--primary"
                :disabled="isInvalid"
                @click="next"
              >
                <span>Next</span>
                <CvgIconArrowRight />
              </button>
            </div>
          </div>
        </template>
      </CvgStepper>
    </CvgPanel>
  </CvgCenterContent>
</template>

<style scoped>
.btn {
  @apply w-full space-x-3 flex justify-center items-center rounded-lg border border-transparent px-6 py-4 text-xl leading-6 font-medium disabled:pointer-events-none focus:outline-none focus:ring focus:ring-blue-300;
}
.btn--primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-200 disabled:text-gray-500;
}
.btn--secondary {
  @apply bg-blue-50 text-blue-800 hover:bg-blue-100 active:bg-blue-200;
}
</style>
