<template>
  <div class="home-wrap">
    <!-- 首页头部 -->
    <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory" />
    <div class="home-container" ref="refreshElm">
      <!-- 轮播图 -->
      <Suspense>
        <template #default>
          <HomeSwiper />
        </template>
        <template #fallback>
          <div>加载中...</div>
        </template>
      </Suspense>
      <!-- 课程列表 -->
      <HomeList :lessonList="lessonList" />
      <!-- 上拉加载提示文案 -->
      <div v-if="isLoading" class="is-text-center has-pd-10">
        <van-loading>加载中...</van-loading>
      </div>
      <div v-if="!hasMore" class="is-text-center has-pd-10">没有更多了...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { IGlobalState } from '@/store'
import { CATEGORY_TYPES } from '@/typings/home'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Store, useStore } from 'vuex'
import * as Types from '@/store/action-types'
import { useLoadMore } from '@/hooks/useLoadMore'
import HomeHeader from './components/HomeHeader.vue'
import HomeList from './components/HomeList.vue'
import HomeSwiper from './components/HomeSwiper.vue'

function useCategory(store: Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory) // vuex中状态
  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category)
    store.dispatch(`home/${Types.SET_LESSON_LIST}`, true)
  }

  return {
    category,
    setCurrentCategory
  }
}

function useLessonList(store: Store<IGlobalState>) {
  let lessonList = computed(() => store.state.home.lessons.list) // vuex中状态

  onMounted(() => {
    // 初始化加载，如果vuex中有数据了，就不用继续加载了
    if (lessonList.value.length === 0) {
      store.dispatch(`home/${Types.SET_LESSON_LIST}`)
    }
  })
  return {
    lessonList
  }
}

export default defineComponent({
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper
  },
  setup() {
    // 1.获取vuex分类状态, 有个更改状态的功能
    let store = useStore<IGlobalState>()
    // 分类
    let { category, setCurrentCategory } = useCategory(store)
    // 课程列表
    let { lessonList } = useLessonList(store)
    // 获取真实dom
    const refreshElm = ref<null | HTMLElement>(null)

    const { isLoading, hasMore } = useLoadMore(refreshElm, store, `home/${Types.SET_LESSON_LIST}`)

    return {
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
      isLoading,
      hasMore
    }
  }
})
</script>

<style lang="scss">
.home-wrap {
  position: relative;
  height: 100%;
}
.home-container {
  position: absolute;
  top: 48px;
  bottom: 50px;
  width: 100%;
  overflow-y: scroll;
  z-index: 0;
}
.is-text-center {
  text-align: center;
}
.has-pd-10 {
  padding: 10px;
}
</style>
