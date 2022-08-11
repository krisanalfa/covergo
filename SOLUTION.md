# Solution

### Tech Stack

#### Base

- [Vue](https://vuejs.org/)

  The reason for using Vue is that it is a very popular framework for building web applications.
  It's easy to learn and has a huge ecosystem of plugins and libraries.
  Personally, I have been using Vue for building a lot of applications.

- [Vite](https://vitejs.dev/)

  The reason for using Vite is that it is known to be the fastest and easiest way to configure Vue build process.
  It has a very good documentation and is very easy to use, since Vue is also natively supported.

- [Tailwind CSS](https://tailwindcss.com/)

  Using raw CSS is not a good idea for building a web application. Because frankly naming is hard!
  Tailwind CSS is a great tool for this, it generates a very small CSS file that contains all the classes that are used in the application.
  It also has a great documentation and tons of useful utilities.

#### Other libraries to speed up development and testing

- [Vitest](https://vitest.dev/)

  This is a great tool for testing Vue components. It has a very good documentation and is very easy to setup, especially if you are using Vite. Did I mention that it's very fast?

- [Eslint](https://eslint.org/)

  Eslint is a great tool for checking code quality. It maintains the code style and helps you to find potential problems.
  With better consistency, it's easier to read and understand the code.

- [Vueuse](https://vueuse.org/)

  I'm using it to build small components that are used in a lot of places.
  Especially inputs and other components that have reactive properties.


### Approach

For the sake of simplicity, I'm going to use a simple Vue component. So I don't use router or advance state management.
So it's going to be a single page application, with no routes. The state of the screen controlled by the component's state.
Of course it's choosen because it's simple, fast, and relatively easy to understand.
But for bigger projects, I would use a router and state management.

The `Wizard` component is a simple component that uses `Stepper` component, which responsible to control the state of the screen.
To determine the screen we need to render, the `Stepper` will render the corresponding dynamic `slot`.
This dynamic `slot` is driven by `Stepper`'s `step` state.

All data is hardcoded and work synchronously.
Of course I can make it asynchronous, but it would increase the complexity of the code quite massively.
My main focus when making this project is to make it as simple as possible.

I'm using Vue composition API to make common functions reusable.
Especially the premium calculator logic.
I also wrote a comprehensive unit test for the composable functions.
I separated the components to be as small as possible.
This is a good practice to make your code more testable and easier to maintain.
Some of the components came with their own unit tests, especially the component that has a lot of logic.

I love automated testing, that's why I spent a lot of time working on the test than the actual implementation.
Currently the test coverage is at **100%**.
You can check the coverage report by running `pnpm run test --coverage` command and serve `coverage` directory.
Here's the latest result:

```
 ✓ src/components/forms/cvg-input.spec.ts (2)
 ✓ src/composables/premium.spec.ts (9)
 ✓ src/components/cvg-wizard.spec.ts (6)
 ✓ src/app.spec.ts (1)

Test Files  4 passed (4)
     Tests  18 passed (18)
  Start at  16:54:27
  Duration  2.32s (setup 1ms, collect 1.56s, tests 217ms)

-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |     100 |      100 |     100 |     100 |
 src                           |     100 |      100 |     100 |     100 |
  App.vue                      |     100 |      100 |     100 |     100 |
  app.ts                       |     100 |      100 |     100 |     100 |
 src/components                |     100 |      100 |     100 |     100 |
  cvg-center-content.vue       |     100 |      100 |     100 |     100 |
  cvg-panel.vue                |     100 |      100 |     100 |     100 |
  cvg-premium-form.vue         |     100 |      100 |     100 |     100 |
  cvg-stepper.vue              |     100 |      100 |     100 |     100 |
  cvg-wizard.vue               |     100 |      100 |     100 |     100 |
 src/components/forms          |     100 |      100 |     100 |     100 |
  cvg-input.vue                |     100 |      100 |     100 |     100 |
  cvg-radio-group.vue          |     100 |      100 |     100 |     100 |
  cvg-select.vue               |     100 |      100 |     100 |     100 |
 src/components/icons/outlined |     100 |      100 |     100 |     100 |
  cvg-icon-cart.vue            |     100 |      100 |     100 |     100 |
  cvg-icon-check.vue           |     100 |      100 |     100 |     100 |
  cvg-icon-refresh.vue         |     100 |      100 |     100 |     100 |
 src/components/icons/solid    |     100 |      100 |     100 |     100 |
  cvg-arrow-left.vue           |     100 |      100 |     100 |     100 |
  cvg-arrow-right.vue          |     100 |      100 |     100 |     100 |
  cvg-icon-check.vue           |     100 |      100 |     100 |     100 |
 src/composables               |     100 |      100 |     100 |     100 |
  premium.ts                   |     100 |      100 |     100 |     100 |
 src/data                      |     100 |      100 |     100 |     100 |
  countries.ts                 |     100 |      100 |     100 |     100 |
  currencies.ts                |     100 |      100 |     100 |     100 |
  index.ts                     |     100 |      100 |     100 |     100 |
  plans.ts                     |     100 |      100 |     100 |     100 |
-------------------------------|---------|----------|---------|---------|-------------------
```

> Since the main focus of this project is the `Wizard` component and premium calculator composable function, I wrote a very extensive unit test for them.

### TODO

- [ ] Make sure it works on mobile
- [ ] Form validation and `submit` event handling
