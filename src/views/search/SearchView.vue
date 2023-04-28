<template>
  <div class="search-view" @click="emits('cancel')">搜索页</div>
</template>

<script setup lang="ts">
interface IEmits {
  (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()
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
}
</style>
