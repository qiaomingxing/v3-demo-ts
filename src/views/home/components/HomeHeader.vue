<template>
  <div class="home-header">
    <img src="@/assets/logo.png" alt="" />
    <van-dropdown-menu>
      <van-dropdown-item :modelValue="category" :options="datas" @change="change" />
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { IProjectTree } from '@/typings/home'
import { computed, defineComponent, onMounted, PropType, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    category: {
      type: Number
    },
    datas: {
      type: Array as PropType<IProjectTree[]>
    }
  },
  emits: ['setCurrentCategory'],
  setup(props, context) {

    function change(value: string | number) {
      context.emit('setCurrentCategory', value)
    }

    return {
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
