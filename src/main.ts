import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import store from './store'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import forms from '@/components/forms/forms.vue';

import './styles/index.stylus'

// createApp(App).use(store).use(router).use(ElementPlus,{locale})
// .component('forms',forms)
// .mount('#app')


const app = createApp(App);

 // Configure routing
 setupRouter(app);

 // router-guard
 setupRouterGuard(router);


app.use(store)
// app.use(router)
app.use(ElementPlus,{locale})
app.component('forms',forms)
app.mount('#app');
