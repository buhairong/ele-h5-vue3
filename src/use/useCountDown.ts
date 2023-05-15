import { computed, ref } from 'vue'
import { rAF, cancelRAF } from '@/utils/raf'

type CurrentTime = {
  days: number
  hours: number
  minutes: number
  seconds: number
  millseconds: number
  total: number
}

type useCountDownOptions = {
  time: number
  millsecond?: boolean
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function parseTime(time: number) {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const millseconds = Math.floor(time % SECOND)

  return {
    days,
    hours,
    minutes,
    seconds,
    millseconds,
    total: time
  }
}

const isSameSecond = (time1: number, time2: number) => {
  return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}

export function useCountDown(options: useCountDownOptions) {
  let rafId: number
  let counting: boolean
  let endTime: number
  const remain = ref(options.time)
  const current = computed(() => parseTime(remain.value))

  const pause = () => {
    counting = false
    cancelRAF(rafId)
  }

  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)

  const setRemain = (value: number) => {
    remain.value = value
    options.onChange?.(current.value)

    if (value === 0) {
      pause()
      options.onFinish?.()
    }
  }

  const microTick = () => {
    rafId = rAF(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        setRemain(remainRemain)

        if (remain.value > 0) {
          microTick()
        }
      }
    })
  }

  const macroTick = () => {
    rafId = rAF(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain)
        }

        if (remain.value > 0) {
          macroTick()
        }
      }
    })
  }

  const tick = () => {
    if (options.millsecond) {
      microTick()
    } else {
      macroTick()
    }
  }

  const start = () => {
    if (!counting) {
      endTime = Date.now() + remain.value
      counting = true
      tick()
    }
  }

  const reset = (totalTime = options.time) => {
    pause()
    remain.value = totalTime
  }

  return {
    start,
    pause,
    reset,
    current
  }
}
