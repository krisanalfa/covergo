import {createApp as createVueApp} from 'vue';
import App from './App.vue';
import './style.css';

export const createApp = () => createVueApp(App);
