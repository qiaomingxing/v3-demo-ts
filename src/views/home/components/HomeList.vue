<template>
  <van-card
    v-for="v in lessonList"
    :key="v.id"
    :price="v.price"
    :title="v.title"
    :thumb="v.poster"
  >
    <template #tags>
      <van-tag plain>{{ formatCategory(v.category) }}</van-tag>
    </template>
  </van-card>
</template>
<script lang="ts">
import { ILesson } from "@/typings/home";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    lessonList: {
      type: Array as PropType<ILesson[]>,
    },
  },
  setup(props, context) {
    //  根据category转化成对应课程名称
    function formatCategory(type: number) {
      return type === 1
        ? "react课程"
        : type == 2
        ? "vue课程"
        : type == 3
        ? "Node课程"
        : "未知";
    }

    return {
      formatCategory,
    };
  },
});
</script>
