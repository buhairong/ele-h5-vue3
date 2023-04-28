<template>
  <div class="home-page">
    <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView"></SearchView>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView" />
  </div>
</template>

<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
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

const [isSearchViewShow, toggleSearchView] = useToggle(false)
</script>

<style lang="scss" scoped></style>
