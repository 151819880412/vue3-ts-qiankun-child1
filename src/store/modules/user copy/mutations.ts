
import { MutationTree } from 'vuex'
import { UserState } from './state'
import { UserMutationTypes } from './mutation-types'

export type Mutations<T = UserState> = {
  [UserMutationTypes.SET_TOKEN](state: T, token: string): void
}

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_TOKEN] (state: UserState, token: string) {
    state.token = token
  }
}


