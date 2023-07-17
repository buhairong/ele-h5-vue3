<script setup lang="ts">
import type { IGood, IMenu } from '@/types'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import OpLoadingView from '@/components/OpLoading.vue'
import OpScrollView from '@/components/OpScrollView.vue'
import { useAsync } from '@/use/useAsync'
import { useCartStore } from '@/stores/cart'
import { fetchGoodsListData } from '@/api/goods'
import GoodsItem from './GoodsItem.vue'

const route = useRoute()
const { id } = route.params
const { data, pending } = useAsync(
  () => fetchGoodsListData(id as string).then((v) => v.data),
  [] as IMenu[]
)

const { setCartItems } = useCartStore()
watch(data, (nv) => {
  const cartGoods = nv
    .reduce((p: IGood[], v: IMenu) => [...p, ...v.goods], [])
    .filter((v) => v.cartCount)
  setCartItems(cartGoods)
})
const categoryActive = ref(0)
const cateActiveRef = ref()
const goodListRefs = ref()
const listScrollTo = ref({
  x: 0,
  y: 0
})

let isCateChange = false
const handleCateChange = (v: number) => {
  isCateChange = true
  const el = goodListRefs.value[v]
  listScrollTo.value = {
    y: -el.offsetTop,
    x: 0
  }
}

const adjustActiveCateTop = (y: number) => {
  const activedCateRefsHeight = 38
  // 越界时，将当前目录栏隐藏
  if (y >= 0) {
    cateActiveRef.value.style.top = `-${activedCateRefsHeight}px`
    return
  }
  // 计算当前位置是否在调整区域，即每个目录标题上方 38px 的区域
  const posY = Math.abs(y)
  for (let i = goodListRefs.value.length - 1; i >= 0; i--) {
    const el = goodListRefs.value[i]
    if (el.offsetTop - activedCateRefsHeight <= posY && posY <= el.offsetTop) {
      const top = el.offsetTop - posY - activedCateRefsHeight
      cateActiveRef.value.style.top = `${top}px`
      return
    }
  }
  // 如果都不在，则需要固定目录栏
  cateActiveRef.value.style.top = '-1px'
}
const findActiveCate = (y: number) => {
  for (let i = goodListRefs.value.length - 1; i >= 0; i--) {
    const el = goodListRefs.value[i]
    if (el.offsetTop <= Math.abs(y)) {
      return i
    }
  }
  return cateActiveRef.value
}
const handleGoodListScroll = (pos: { x: number; y: number }) => {
  // 如果是点击菜单栏引起的右侧栏滚动，则忽略
  if (isCateChange) {
    isCateChange = false
    return
  }
  adjustActiveCateTop(pos.y)
  categoryActive.value = findActiveCate(pos.y)
}
</script>

<template>
  <OpLoadingView :loading="pending" type="skeleton">
    <div class="shop-goods-list">
      <VanSidebar v-model="categoryActive" class="sidebar" @change="handleCateChange">
        <OpScrollView :data="data">
          <VanSidebarItem
            ref="cateRefs"
            v-for="v in data"
            :key="v.label"
            :title="v.label"
          ></VanSidebarItem>
        </OpScrollView>
      </VanSidebar>
      <div class="list">
        <div ref="cateActiveRef" class="category-name category-name__fixed">
          {{ data[categoryActive].label }}
        </div>
        <OpScrollView
          :data="data"
          :scroll-to="listScrollTo"
          @scroll="handleGoodListScroll"
          @scroll-end="handleGoodListScroll"
        >
          <template v-for="v in data" :key="v.label">
            <div class="category-name" ref="goodListRefs">{{ v.label }}</div>
            <GoodsItem v-for="cv in v.goods" :key="cv.id" :data="cv" />
          </template>
        </OpScrollView>
      </div>
    </div>
  </OpLoadingView>
</template>

<style lang="scss" scoped>
.shop-goods-list {
  --van-sidebar-selected-border-color: none;
  --van-sidebar-padding: 14px var(--van-padding-sm);
  --van-sidebar-font-size: 13px;

  display: flex;
  height: 480px;

  .sidebar {
    overflow-y: hidden;
    padding-bottom: 50px;
  }

  .list {
    flex: 1;
    margin: 0 10px;
    position: relative;

    .category-name {
      font-size: 15px;
      font-weight: bold;
      padding: 10px 0;
      line-height: 1.2;
      background: white;
      z-index: 1;
      width: 100%;

      &__fixed {
        position: absolute;
        top: -1px;
        left: 0;
      }
    }
  }
}
</style>
