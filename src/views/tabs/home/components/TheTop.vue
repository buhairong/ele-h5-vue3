<template>
  <div class="home-top">
    <div class="top">
      <img class="location-icon" src="@/assets/imgs/index_page/location.png" />
      <div class="location">幸福小区（北一区东南门）</div>
      <img class="shopcart-icon" src="@/assets/imgs/index_page/shopcart.png" />
      <img class="comments-icon" src="@/assets/imgs/index_page/comments.png" />
    </div>
    <!-- <van-search
      shape="round"
      background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
      placeholder="世界茶饮 35减2"
    >
      <template #right-icon>
        <div>搜索</div>
      </template>
    </van-search> -->
    <VanSticky>
      <OpSearch
        shape="round"
        background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
        placeholder="世界茶饮 35减2"
        @inputClick="emits('searchClick')"
      >
        <template #right-icon>
          <div @click="emits('searchClick')">搜索</div>
        </template>
      </OpSearch>
    </VanSticky>
    <div class="search-recommend">
      <div v-for="v in recomments" :key="v.value" class="tag" @click="emits('searchClick')">
        {{ v.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISearchRecomment } from '@/types'
import OpSearch from '@/components/OpSearch.vue'

interface IProps {
  recomments: ISearchRecomment[]
}

interface IEmits {
  (e: 'searchClick'): void
}

defineProps<IProps>()

const emits = defineEmits<IEmits>()
</script>

<style lang="scss" scoped>
.home-top {
  background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
  color: #fff;
  .top {
    padding: 10px 10px 0;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    img {
      width: 24px;
      height: 24px;
    }
    .location-icon {
      width: 20px;
      height: 20px;
    }
    .comments-icon {
      width: 28px;
      margin-left: 10px;
    }
    .location {
      flex: 1;
    }
  }
  .search-recommend {
    display: flex;
    padding: 0 10px 8px;
    .tag {
      font-size: 12px;
      border-radius: 10px;
      background: rgb(242, 242, 242, 0.3);
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
  :deep(.van-field__right-icon) {
    margin-right: 0;
  }
}
</style>
