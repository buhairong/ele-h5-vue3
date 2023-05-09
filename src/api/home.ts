import axios from './base'
import type { IHomeInfo } from '@/types'

export function fetchHomePageData() {
  return axios.get<IHomeInfo, IHomeInfo>('home_page')
}
