<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView" />
    <OpLoading :loading="pending" type="skeleton">
      <!-- <template #template>
        <div>loading</div>
      </template> -->
    </OpLoading>
  </div>
</template>

<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import type { IHomeInfo } from '@/types'
import OpLoading from '@/components/OpLoading.vue'

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

const { pending, data } = useAsync(fetchHomePageData, {} as IHomeInfo)
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
