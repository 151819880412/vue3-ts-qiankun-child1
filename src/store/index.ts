import { createStore, Store } from 'vuex';
import modules from './modules';
import { StateType } from '@/@types';
// import { user } from './modules/user/index';

console.log(modules)
const store: Store<StateType> = createStore({
  strict: false,
  modules: { ...modules },
  // modules: { user },
});
export default store;
