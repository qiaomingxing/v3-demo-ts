import { IGlobalState } from '@/store';
import { computed, onMounted, Ref } from 'vue';
import { Store } from 'vuex';
import _ from 'lodash'

export function useLoadMore(refreshElm: Ref<null | HTMLElement>, store: Store<IGlobalState>, type: string) {

    // 防抖
    let element: HTMLElement;
    function _loadMore() {
        // 获取可是区域高度  卷曲的高度  整个高度
        let containerHeight = element.clientHeight;
        let scrollTop = element.scrollTop;
        let scrollHeight = element.scrollHeight;
        // 距离页面底部20px触发加载更多
        if (containerHeight + scrollTop + 20 >= scrollHeight) {
            store.dispatch(type)
        }
    }


    onMounted(() => {
        element = refreshElm.value as HTMLElement
        element.addEventListener('scroll', _.debounce(_loadMore, 200))
    })

    const isLoading = computed(() => {
        return store.state.home.lessons.loading
    })
    const hasMore = computed(() => {
        return store.state.home.lessons.hasMore
    })


    return {
        isLoading,
        hasMore
    }
}