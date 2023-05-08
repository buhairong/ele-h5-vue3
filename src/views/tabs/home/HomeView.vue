<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView"></SearchView>
    </Transition>
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

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
