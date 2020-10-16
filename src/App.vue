<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>

  <van-tabbar>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/mine" icon="orders-o">课程页</van-tabbar-item>
    <van-tabbar-item to="/profile" icon="manager-o">个人中心</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
