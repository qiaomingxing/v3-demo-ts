<template>
  <div class="home-wrap">
    <!-- 首页头部 -->
    <HomeHeader :datas="projectTrees" :category="category" @setCurrentCategory="setCurrentCategory" />
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
      <!-- 项目列表 -->
      <HomeList :datas="homeList" />
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
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Store, useStore } from 'vuex'
import * as Types from '@/store/action-types'
import { useLoadMore } from '@/hooks/useLoadMore'
import HomeHeader from './components/HomeHeader.vue'
import HomeList from './components/HomeList.vue'
import HomeSwiper from './components/HomeSwiper.vue'

function useCategory(store: Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory) // vuex中状态
  function setCurrentCategory(value: string | number) {
    store.commit(`home/${Types.SET_CATEGORY}`, value)
    store.dispatch(`home/${Types.SET_PROJECT_LIST}`, true)
  }

  return {
    category,
    setCurrentCategory
  }
}

function userProjectTrees(store: Store<IGlobalState>) {
  const projectTrees = computed(() => store.state.home.projectTrees)
  onMounted(() => {
    // 初始化加载，如果vuex中有数据了，就不用继续加载了
    if (projectTrees.value.length === 0) {
      store.dispatch(`home/${Types.SET_PROJECT_TREE_LIST}`)
    }
  })
  return { projectTrees }
}

function useHomeList(store: Store<IGlobalState>) {
  let homeList = computed(() => store.state.home.projects.datas) // vuex中状态

  onMounted(() => {
    // 初始化加载，如果vuex中有数据了，就不用继续加载了
    if (homeList.value.length === 0) {
      store.dispatch(`home/${Types.SET_PROJECT_LIST}`)
    }
  })
  return { homeList }
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
    let { projectTrees } = userProjectTrees(store)
    // 项目列表
    let { homeList } = useHomeList(store)
    // 获取真实dom
    const refreshElm = ref<null | HTMLElement>(null)

    const { isLoading, hasMore } = useLoadMore(refreshElm, store, `home/${Types.SET_PROJECT_LIST}`)

    return {
      category,
      setCurrentCategory,
      projectTrees,
      homeList,
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
