<template>
  <div class="shop-page">
    <VanNavBar left-text="返回" left-arrow @click-left="onClickLeft"></VanNavBar>
    <OpLoadingView :loading="pending" type="skeleton">
      <ShopHeader :data="data" />
    </OpLoadingView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAsync } from '@/use/useAsync'
import { fetchShopPageData } from '@/api/shop'
import OpLoadingView from '@/components/OpLoading.vue'
import ShopHeader from './components/ShopHeader.vue'

const route = useRoute()
const { id } = route.params
const { data, pending } = useAsync(() => fetchShopPageData(id as string), {
  announcement: '',
  discounts: [],
  redbags: [],
  activitys: [],
  branch: '',
  comments: [],
  deliveryDistance: '',
  deliveryStrategy: '',
  deliveryStratingPrice: '',
  deliveryTags: [],
  deliveryTime: '',
  id: '',
  monthlyCount: 0,
  postUrl: '',
  bgUrl: '',
  score: 0,
  services: [],
  shopName: '',
  tops: []
})

const onClickLeft = () => history.back()
</script>

<style lang="scss" scoped>
.shop-page {
  .van-tabs__line,
  .van-nav-bar {
    z-index: 0;
  }
}
</style>
