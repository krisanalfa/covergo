import type {App} from 'vue';

import {createApp} from './app';

describe('app', () => {
  let app: App<Element>;

  beforeEach(() => {
    app = createApp();
  });

  it('must be defined', () => {
    expect(app).toBeDefined();
  });
});
