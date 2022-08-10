<template>
  <div class="relative z-0">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative lg:grid lg:grid-cols-7">
        <div class="mt-5 max-w-lg mx-auto lg:mt-8 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
          <div class="relative z-10 rounded-lg">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
