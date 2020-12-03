<template>
  <van-card v-for="v in datas" :key="v.id" :title="v.title" :thumb="v.envelopePic" :desc="v.desc" @click="onClick(v.link)">
    <template #price>
      <div class="bottom">
        <van-tag plain type="primary">{{ v.niceDate }}</van-tag>
        <van-tag plain type="success">{{ formatstr(v.author) }}</van-tag>
      </div>
    </template>
  </van-card>
</template>
<script lang="ts">
import { IProject } from '@/typings/home'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    datas: {
      type: Array as PropType<IProject[]>
    }
  },
  setup(props, context) {
    function onClick(url: string) {
      window.open(url)
    }

    function formatstr(value: string) {
      return `${value}`
    }

    return {
      onClick,
      formatstr
    }
  }
})
</script>

<style lang="scss">
.bottom {
  width: 100%;
  .van-tag {
    display: inline-block;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
