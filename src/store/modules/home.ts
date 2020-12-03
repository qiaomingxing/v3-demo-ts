import { IHomeState, ISlider, IProjects, IProjectTree } from '@/typings/home'
import { Module } from 'vuex'
import { IGlobalState } from '..'
import * as Types from '@/store/action-types'
import { getProjects, getSliders, getProjectTrees } from '@/api/modules/home'

// 初始化项目数据对象
const initialProjects: IProjects = {
  hasMore: true,
  loading: false,
  curPage: 1,
  pageCount: 15,
  datas: []
}

// 模块状态定义
const state: IHomeState = {
  currentCategory: 294,
  sliders: [],
  projects: Object.assign({}, initialProjects),
  projectTrees: []
}

/**
 * @param IHomeState 模块状态
 * @param IGlobalState 全局状态
 */
const module: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    // 设置分类
    [Types.SET_CATEGORY](state, payload: string | number) {
      state.currentCategory = payload
    },
    // 设置轮播图
    [Types.SET_SLIDER_LIST](state, payload: ISlider[]) {
      state.sliders = payload
    },
    // 设置loading
    [Types.SET_LOADING](state, payload: boolean) {
      state.projects.loading = payload
    },
    // 设置项目分类
    [Types.SET_PROJECT_TREE_LIST](state, payload: IProjectTree[]) {
      state.projectTrees = payload.map((item: IProjectTree) => {
        return { text: item.name, value: item.id }
      })
    },
    // 设置项目列表
    [Types.SET_PROJECT_LIST](state, payload: IProjects) {
      state.projects.datas = [...state.projects.datas, ...payload.datas]
      state.projects.hasMore = payload.curPage < payload.pageCount
      state.projects.loading = false
    }
  },
  actions: {
    /**
     * 获取轮播图数据
     */
    async [Types.SET_SLIDER_LIST]({ commit }) {
      const res = await getSliders<ISlider>()
      commit(Types.SET_SLIDER_LIST, res)
    },
    /**
     * 获取项目分类列表
     */
    async [Types.SET_PROJECT_TREE_LIST]({ commit }) {
      const res = await getProjectTrees<IProjectTree[]>()
      commit(Types.SET_PROJECT_TREE_LIST, res)
    },
    /**
     * 获取项目列表数据
     * @param initial 是否为初始化数据
     */
    async [Types.SET_PROJECT_LIST]({ commit, state }, initial: boolean = false) {
      const { loading, hasMore } = state.projects
      // 1）不是初始化加载 2）正在加载 或 没有更多数据
      if (!initial && (loading || !hasMore)) {
        return
      }
      // 是否为初始化加载
      if (initial) {
        state.projects = Object.assign({}, initialProjects)
      }
      // 开始加载数据，显示loading
      commit(Types.SET_LOADING, true)
      // 接口获取数据
      const res = await getProjects<IProjects>(state.currentCategory, state.projects.curPage++)
      commit(Types.SET_PROJECT_LIST, res)
    }
  }
}

export default module
