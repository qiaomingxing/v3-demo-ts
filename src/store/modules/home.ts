import { CATEGORY_TYPES, IHomeState, ILessons, ISlider } from '@/typings/home'
import { Module } from 'vuex'
import { IGlobalState } from '..'
import * as Types from '@/store/action-types'
import { getLessons, getSliders } from '@/api/modules/home'

// 初始化课程数据对象
const initialLessons: ILessons = {
    hasMore: true,
    loading: false,
    offset: 0,
    limit: 5,
    list: []
}

// 模块状态定义
const state: IHomeState = {
    currentCategory: CATEGORY_TYPES.ALL,
    sliders: [],
    lessons: Object.assign({}, initialLessons)
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
        [Types.SET_CATEGORY](state, payload: CATEGORY_TYPES) {
            state.currentCategory = payload
        },
        // 设置轮播图
        [Types.SET_SLIDER_LIST](state, payload: ISlider[]) {
            state.sliders = payload
        },
        // 设置loading
        [Types.SET_LOADING](state, payload: boolean) {
            state.lessons.loading = payload
        },
        // 设置课程列表
        [Types.SET_LESSON_LIST](state, payload: ILessons) {
            state.lessons.list = [...state.lessons.list, ...payload.list]
            state.lessons.hasMore = payload.hasMore
            state.lessons.offset = state.lessons.offset + payload.list.length
            state.lessons.loading = false
        }
    },
    actions: {
        /**
         * 获取轮播图数据
         */
        async [Types.SET_SLIDER_LIST]({ commit }) {
            let sliders = await getSliders<ISlider>()
            commit(Types.SET_SLIDER_LIST, sliders)
        },
        /**
         * 获取课程列表数据
         * @param initial 是否为初始化数据
         */
        async [Types.SET_LESSON_LIST]({ commit, state }, initial: boolean = false) {
            const { loading, hasMore } = state.lessons
            // 1）不是初始化加载 2）正在加载 或 没有更多数据
            if (!initial && (loading || !hasMore)) {
                return
            }
            // 是否为初始化加载
            if (initial) {
                state.lessons = Object.assign({}, initialLessons)
            }
            // 开始加载数据，显示loading
            commit(Types.SET_LOADING, true)
            // 接口获取数据
            let lessons = await getLessons<ILessons>(state.currentCategory, state.lessons.offset, state.lessons.limit)
            commit(Types.SET_LESSON_LIST, lessons)
        }
    }
}

export default module