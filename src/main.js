import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/basic.css'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import 'primeflex/primeflex.css';



const app = createApp(App)
app.use(store)
app.component('Dialog', Dialog)
app.component('Button', Button)
app.mount('#app')
