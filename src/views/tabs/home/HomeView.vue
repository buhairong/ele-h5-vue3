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
      <ScrollBar :data="data.scrollBarInfoList" />
      <div class="home-page__activity">
        <CountDown :data="data.countdown" />
        <OpSwipe class="home-page__activity__swipe" :autoplay="3000" :loop="true">
          <OpSwipeItem v-for="(item, index) in data.activities" :key="index">
            <img :src="item" />
          </OpSwipeItem>
        </OpSwipe>
      </div>
    </OpLoading>
  </div>
</template>

<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue'
import CountDown from './components/CountDown.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import type { ICountdown, IHomeInfo } from '@/types'
import OpLoading from '@/components/OpLoading.vue'
import OpSwipe from '@/components/swipe/OpSwipe'
import OpSwipeItem from '@/components/swipe/OpSwipeItem'

const [isSearchViewShow, toggleSearchView] = useToggle(false)

const { pending, data } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: []
} as IHomeInfo)
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
  padding-bottom: 100px;
  background: var(--op-gray-bg-color);
  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: #fff;
    }
  }
  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
