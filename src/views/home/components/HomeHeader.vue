<template>
  <div class="home-header">
    <img src="@/assets/logo.png" alt="" />
    <van-dropdown-menu>
      <van-dropdown-item :modelValue="category" :options="options" @change="change" />
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { CATEGORY_TYPES } from '@/typings/home'
import { defineComponent, PropType, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES>
    }
  },
  emits: ['setCurrentCategory'],
  setup(props, context) {
    let state = reactive({
      options: [
        { text: '全部课程', value: CATEGORY_TYPES.ALL },
        { text: 'React课程', value: CATEGORY_TYPES.REACT },
        { text: 'Vue课程', value: CATEGORY_TYPES.VUE },
        { text: 'Node课程', value: CATEGORY_TYPES.NODE }
      ]
    })
    function change(value: CATEGORY_TYPES) {
      context.emit('setCurrentCategory', value)
    }
    return {
      ...toRefs(state),
      change
    }
  }
})
</script>

<style lang="scss">
.home-header {
  height: 48px;
  background: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 95%;
  img {
    height: 50px;
  }

  .van-dropdown-menu__bar {
    box-shadow: none;
  }
  .van-dropdown-menu__item {
    background-color: #2a2a2a;
  }

  .van-dropdown-menu__title {
    color: #fff;
  }
}
</style>