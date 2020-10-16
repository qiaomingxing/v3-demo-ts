<template>
  <van-swipe
    v-if="sliderList"
    class="my-swipe"
    :autoplay="3000"
    indicator-color="white"
  >
    <van-swipe-item v-for="v in sliderList" :key="v.url">
      <img :src="v.url" alt="" style="max-width: 100%" />
    </van-swipe-item>
  </van-swipe>
</template>
<script lang="ts">
import { IGlobalState } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import * as Types from "@/store/action-types";

export default defineComponent({
  async setup(props, context) {
    //  页面初始化获取数据
    let store = useStore<IGlobalState>();
    let sliderList = computed(() => store.state.home.sliders);
    if (sliderList.value.length === 0) {
      // 缓存获取的数据
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`);
    }

    return {
      sliderList,
    };
  },
});
</script>
