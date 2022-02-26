
import { ActionTree, ActionContext } from 'vuex';
import { Mutations } from './mutations';
import { StateType } from '@/@types';
import { UserState } from './state';
// import { state, UserState } from './state';

import { UserMutationTypes } from './mutation-types';
import { UserActionTypes } from './action-types';


// 有参数的
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1], //Parameters<T> 的作用是用于获得函数的参数类型组成的元组类型。
  ): ReturnType<Mutations[K]>;            //ReturnType<T> 的作用是用于获取函数 T 的返回类型。
} & Omit<ActionContext<UserState, StateType>, 'commit'>;    //Omit<T, K extends keyof any> 的作用是使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。

// 无参数的
// type NoAugmentedActionContext = {
//   commit<K extends keyof Mutations>(
//     key: K,
//   ): ReturnType<Mutations[K]>;
// } & Omit<ActionContext<UserState, StateType>, 'commit'>;

export interface Actions {
  // 有参
  [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext , token: string): void;
  // 无参
  // [UserActionTypes.ACTION_LOGIN]({ commit }: NoAugmentedActionContext): void;
}

 const actions: ActionTree<UserState, StateType> & Actions = {
  // 有参
  
  [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext,token:string) {
    console.log(token)
    commit(UserMutationTypes.SET_TOKEN, token);
  },

  // 无参
  // [UserActionTypes.ACTION_LOGIN]({ commit }) {
  //   commit(UserMutationTypes.SET_TOKEN);
  // },

};

export default actions