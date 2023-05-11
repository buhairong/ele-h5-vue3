<template>
  <div class="home-countdown">
    <div class="home-countdown__info">
      <img class="logo" src="@/assets/imgs/index_page/count-down.png" alt="" />
      <span class="number">{{ padStart(1) }}</span>
      <span class="colon">:</span>
      <span class="number">{{ padStart(1) }}</span>
      <span class="colon">:</span>
      <span class="number">{{ padStart(1) }}</span>
    </div>
    <div class="home-countdown__goods">
      <img :src="data.goods.imgUrl" alt="" class="goods-img" />
      <div class="goods-name op-ellipsis">{{ data.goods.name }}</div>
      <div class="goods-price">
        <span class="goods-price__now">
          ¥<span>{{ data.goods.price }}</span>
        </span>
        <span class="goods-price__old">
          ¥<span>{{ data.goods.oldPrice }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICountdown } from '@/types'

interface IPros {
  data: ICountdown
}

const props = defineProps<IPros>()

const padStart = (num: number) => {
  return num.toString().padStart(2, '0')
}
</script>

<style lang="scss" scoped>
.home-countdown {
  border-radius: 8px;
  width: 180px;
  height: 170px;
  background: linear-gradient(to bottom, rgb(252, 202, 202), white, white, white);
  padding: 15px 10px;
  box-sizing: border-box;
  justify-content: flex-end;

  &__info {
    display: flex;
    align-items: center;
    .logo {
      width: 80px;
      margin-right: 8px;
    }
    .number {
      font-size: 12px;
      background: rgb(252, 78, 78);
      color: white;
      padding: 2px;
      border-radius: 2px;
      width: 16px;
      font-weight: bold;
      text-align: center;
    }
    .colon {
      margin: 0 1px;
      color: red;
    }
  }

  &__goods {
    margin-top: 8px;
    .goods-img {
      width: 160px;
      height: 74px;
      margin-bottom: 4px;
    }
    .goods-price {
      align-items: baseline;
      font-size: 12px;
      &__now {
        color: red;
        margin-right: 4px;
        span {
          font-weight: bold;
          font-size: 16px;
        }
      }
      &__old {
        text-decoration: line-through;
      }
    }
  }
}
</style>
