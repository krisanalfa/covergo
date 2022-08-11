/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// / <reference types="vite/client" />

declare module '*.vue' {
  import type {DefineComponent} from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@krisanalfa/covergo' {
  export interface User {
    name: string;
    age: number;
    country: number;
    plan: number;
  }
}
