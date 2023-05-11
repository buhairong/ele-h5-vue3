<template>
  <div class="op-loading-view" v-if="loading">
    <slot name="template">
      <div class="loading-wrapper" v-if="type === 'loading'">
        <van-loading />
      </div>
      <div class="skeleton-wrapper" v-if="type === 'skeleton'">
        <van-skeleton :row="10" />
        <van-skeleton title avatar :row="5" />
        <van-skeleton title :row="5" />
      </div>
    </slot>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
interface IProps {
  loading: boolean
  type: 'loading' | 'skeleton'
}
defineProps<IProps>()
</script>

<style lang="scss">
.op-loading-view {
  background: #fff;
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  .skeleton-wrapper {
    padding: 20px 10px;
  }
}
</style>
