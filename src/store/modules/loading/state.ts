import { StateType } from '@/@types'
import { Module } from 'vuex'

const state = {
  lock: true,
  text: 'Loading...',
  // spinner: 'qqqqq',
  background: 'rgba(0, 0, 0, 0.7)',
}
type LoadingStateType = typeof state

const loading: Module<LoadingStateType, StateType> = { namespaced: false, ...state }

export { LoadingStateType, state }
export default loading