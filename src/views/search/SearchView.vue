<template>
  <div class="search-view">
    <OpSearch
      show-action
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="emits('cancel')"
      @click.stop
    ></OpSearch>
    <div class="search-view__history" v-if="!searchValue">
      <div class="label">历史搜索</div>
      <TransitionGroup name="list">
        <div
          class="history-tag"
          v-for="(v, index) in historyTags"
          :key="index"
          @click="onTagClick(v)"
        >
          {{ v }}
        </div>
        <div class="history-tag" @click.stop="toggleHistoryTag">
          <van-icon name="arrow-up" v-if="isHistoryTagShow"></van-icon>
          <van-icon name="arrow-down" v-else></van-icon>
        </div>
      </TransitionGroup>
    </div>
    <div class="search-view__result" v-else>
      <div class="result-item" v-for="(v, index) in searchResult" :key="index">
        <van-icon name="search"></van-icon>
        <div class="name">{{ v.label }}</div>
        <div class="count">约{{ v.resultCount }}个结果</div>
      </div>
      <div class="no-result" v-if="searchResult.length === 0">暂无推荐</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import OpSearch from '@/components/OpSearch.vue'
import { fetchSearchData } from '@/api/search'
import type { ISearchResult } from '@/types'
import { useToggle } from '@/use/useToggle'

const HISTORY_TAGS = [
  '比萨',
  '栗子',
  '切果NOW',
  '炒饭',
  '出前一丁',
  '玉米',
  '牛腩',
  '土豆焗饭',
  '烧烤',
  '水果'
]

interface IEmits {
  (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()

const searchValue = ref('')
const searchResult = ref<ISearchResult[]>([])
const [isHistoryTagShow, toggleHistoryTag] = useToggle(false)

const historyTags = computed(() =>
  isHistoryTagShow.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5)
)

watch(searchValue, (v) => {
  if (!v) {
    searchResult.value = []
    return
  }

  onSearch(v)
})

const onSearch = async (v: string | number = '') => {
  const { list } = await fetchSearchData(v as string)
  searchResult.value = list
}

const onTagClick = (v: string) => {
  searchValue.value = v
  onSearch(v)
}
</script>

<style lang="scss" scoped>
.search-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 100;
  &__history {
    padding: var(--van-padding-sm);
    .label {
      margin-bottom: var(--van-padding-xs);
    }
    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }
  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);
      .name {
        flex: 1;
        padding-left: 6px;
      }
      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
