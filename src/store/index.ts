import { IHomeState } from '@/typings/home'
import { createStore, Store } from 'vuex'
import home from './modules/home'

export interface IGlobalState {
  home: IHomeState // 模块状态
}

export default createStore<IGlobalState>({
  modules: {
    home
  }
})
