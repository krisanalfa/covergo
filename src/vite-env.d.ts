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

  export interface Plan {
    label: string;
    value: number;
    rate: number;
  }

  export interface Currency {
    rate: number;
  }

  export interface Country {
    label: string;
    value: number;
    currency: string;
    locale: string;
  }
}
