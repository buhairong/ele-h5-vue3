<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="data.searchRecomments" @searchClick="toggleSearchView" />
    <OpLoading :loading="pending" type="skeleton">
      <div class="home-page__banner">
        <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
      </div>
      <TheTransformer :data="data.transformer" />
    </OpLoading>
  </div>
</template>

<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import TheTransformer from './components/TheTransformer.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import type { IHomeInfo } from '@/types'
import OpLoading from '@/components/OpLoading.vue'

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

.home-page {
  background: var(--op-gray-bg-color);
  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: #fff;
    }
  }
}
</style>
