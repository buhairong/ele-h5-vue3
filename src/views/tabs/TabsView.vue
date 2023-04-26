<template>
  <RouterView />
  <Tabbar v-model="active">
    <TabbarItem name="home" icon="home-o">首页</TabbarItem>
    <TabbarItem name="order" icon="bars">订单</TabbarItem>
    <TabbarItem name="me" icon="contact">我的</TabbarItem>
  </Tabbar>
</template>

<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { Tabbar, TabbarItem } from 'vant'
import { ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const active = ref(route.name as string)

watch(active, (val) => {
  router.push({
    name: val
  })
})
</script>
