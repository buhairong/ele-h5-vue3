import { computed, ref } from 'vue'

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

export function useCountDown(options: useCountDownOptions) {
  let counting: boolean
  let endTime: number
  const remain = ref(options.time)
  const current = computed(() => parseTime(remain.value))

  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)

  const pause = () => {}

  const reset = () => {}

  const rAF = (fn: Function) => {}

  const setRemain = (value: number) => {
    remain.value = value
    options.onChange?.(current.value)

    if (value === 0) {
      pause()
      options.onFinish?.()
    }
  }

  const microTick = () => {
    rAF(() => {
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
    rAF(() => {
      if (counting) {
        //
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

  return {
    start,
    pause,
    reset,
    current
  }
}
