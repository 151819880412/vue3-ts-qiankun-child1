import { StateType } from '@/@types';
import { Module } from 'vuex';
// import {  Actions } from './actions'
import actions from './actions'


export interface UserState {
  token: string;
  username: string;
  userId: number;
  tenantId: number;
  roleId: number;
}

const state: UserState = {
  token: '',
  username: '',
  userId: 0,
  tenantId: 0,
  roleId: 0,
};



type UserStateType = typeof state;

const user: Module<UserStateType, StateType> = { actions, ...state };


export { UserStateType, state };
export default user;




// export interface UserState {
//   token: string;
//   username: string;
//   userId: number;
//   tenantId: number;
//   roleId: number;
// }

// const state: UserState = {
//   token: '',
//   username: '',
//   userId: 0,
//   tenantId: 0,
//   roleId: 0,
// };
// type UserStateType = typeof state;

// export { UserStateType,state };