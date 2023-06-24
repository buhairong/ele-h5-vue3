import type { IUserInfo } from '@/types'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface IUserState {
  userInfo: IUserInfo
  token: string
}

const getDefaultUserInfo: () => IUserInfo = () => ({
  id: '',
  avatar: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
  nickname: '请登录'
})

export const useUserStore = defineStore('user', () => {
  const state = ref({
    userInfo: getDefaultUserInfo(),
    token: ''
  })

  const getUserInfo = computed(() => {
    return state.value.userInfo
  })

  const setInfo = ({ token, userInfo }: IUserState) => {
    state.value.token = token
    state.value.userInfo = userInfo
  }

  const removeInfo = () => {
    state.value.token = ''
    state.value.userInfo = getDefaultUserInfo()
  }

  return {
    state,
    getUserInfo,
    setInfo,
    removeInfo
  }
})
