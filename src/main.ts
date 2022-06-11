// import { createApp } from 'vue'
// import App from './App.vue'
// import { router, setupRouter } from '@/router';
// import { setupRouterGuard } from '@/router/guard';
// import store from './store/index'

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import Loading from "@/views/layout/components/Loading/index.js";

import './styles/index.stylus';

// console.log(App)

// const app:any = createApp(App);

//  // Configure routing
//  setupRouter(app);

//  // router-guard
//  setupRouterGuard(router);


// app.use(store)
// // app.use(router)
// // app.use(Loading)
// app.use(ElementPlus,{locale})
// app.mount('#child1');

// export default app









import './public-path.ts';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './router/routes';
import store from './store';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

let router: any = null;
let instance: any = null;
let history: any = null;

function render(props: any = {}) {
  const { container } = props;
  // 当为微服务主节点情况下访问，会设置二级路径，而直接访问时没有二级路径，此处需要根据实际情况修改
  history = createWebHistory('/child1');
  router = createRouter({
    history,
    routes
  });

  instance = createApp(App);


  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    instance.component(key, component);
  }


  instance.use(router);
  instance.use(ElementPlus, { locale });
  instance.use(store);
  instance.use(Loading);
  instance.mount(container ? container.querySelector('#child1') : '#child1');
}

render();

export const bootstrap = async (): Promise<void> => {
  console.log('%c ', 'color: green ', 'vue3.0 app bootstraped');
};

const storeTest = (props: any): void => {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    });
};

export const mount = async (props: any): Promise<void> => {
  storeTest(props);
  render(props);
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
};

export const unmount = async (): Promise<void> => {
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
  history.destroy();
};