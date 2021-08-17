import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/basic.css'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import 'primeflex/primeflex.css';


const app = createApp(App)
app.use(store)
app.use(PrimeVue,  {ripple: true})
app.component('Card', Card)
app.component('Dropdown', Dropdown)
app.component('Dialog', Dialog)
app.component('Button', Button)
app.mount('#app')
