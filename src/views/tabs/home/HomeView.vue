<template>
  <div class="home-page">
    <SearchView></SearchView>
    <TheTop :recomments="recomments" />
  </div>
</template>

<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import { useToggle } from '@/use/useToggle'

const recomments = [
  {
    value: 1,
    label: '牛腩'
  },
  {
    value: 2,
    label: '色拉'
  }
]

const [isSearchViewShow, toggleSearchView] = useToggle()
</script>

<style>
.test {
  font-size: 37.5px;
}
</style>
