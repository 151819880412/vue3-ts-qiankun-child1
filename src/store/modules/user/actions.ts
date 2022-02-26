// https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

import { ActionTree, ActionContext } from 'vuex';
import { UserState } from './state';

import { Mutations } from './mutations';
import { UserMutationTypes } from './mutation-types';
import { UserActionTypes } from './action-types';
import { StateType } from '@/@types';


type AugmentedActionContext = {
  // Parameters<T> 的作用是用于获得函数的参数类型组成的元组类型。
  //ReturnType<T> 的作用是用于获取函数 T 的返回类型。
  commit<K extends keyof Mutations>(key: K,payload: Parameters<Mutations[K]>[1],{}): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, StateType>, 'commit'>;//Omit<Type, Keys> 通过从中选取所有属性Type然后删除Keys（字符串文字或字符串文字的并集）来构造类型

export interface Actions {
  [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext,token: string): void;
}

export const actions: ActionTree<UserState, StateType> & Actions = {
  async [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext,token: string) {
    commit(UserMutationTypes.SET_TOKEN, token,{});
  },
};