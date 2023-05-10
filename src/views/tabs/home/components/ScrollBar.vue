<template>
  <div class="home-scroll-bar">
    <div class="home-scroll-bar-swipe">
      <div ref="containerRef">
        <div class="swipe-item" v-for="v in props.data" :key="v.type">
          {{ v.type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface IProps {
  intervalTime?: number
  transitionTime?: number
  height?: number
  data: IScrollBarInfo[]
}

const props = withDefaults(defineProps<IProps>(), {
  intervalTime: 3000,
  transitionTime: 1000,
  height: 40
})

const containerRef = ref()

onMounted(() => {
  const container = containerRef.value
  const count = container.children.length
  const firstSwipeItem = container.children[0]
  container.style.height = `${count * props.height}px`
  let index = 0
  useInterval(() => {
    index++
    container.style.transform = `translateY(-${index * props.height}px)`
  }, props.intervalTime)
})
</script>

<style lang="scss" scoped></style>
