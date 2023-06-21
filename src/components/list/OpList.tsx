import { defineComponent, ref, onMounted, nextTick, onUpdated } from 'vue'
import { createNamespace } from '@/utils/create'
import { Loading as VanLoading } from 'vant'
import { useEventListener } from '@/use/useEventListener'
import { useRect } from '@/use/useRect'
import { useScrollParent } from '@/use/useScrollParent'
import './OpList.scss'

const [name, bem] = createNamespace('list')

export default defineComponent({
  name,
  props: {
    offset: {
      type: Number,
      default: 300
    },
    direction: {
      type: String,
      default: 'down'
    },
    loading: {
      type: Boolean
    },
    finished: {
      type: Boolean
    },
    finishedText: {
      type: String
    },
    loadingText: {
      type: String
    }
  },
  setup(props, { slots, emit }) {
    const loading = ref(props.loading)
    const root = ref()
    const placeholder = ref()
    const scrollParent = useScrollParent(root)

    const check = () => {
      nextTick(() => {
        if (loading.value || props.finished) {
          return
        }

        const scrollParentRect = useRect(scrollParent)
        if (!scrollParentRect.height) {
          return
        }

        const placeholderRect = useRect(placeholder)
        const { offset, direction } = props
        let isReachEdge = false
        if (direction === 'up') {
          isReachEdge = scrollParentRect.top - placeholderRect.top <= offset
        } else {
          isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset
        }

        if (isReachEdge) {
          loading.value = true
          emit('update:loading', true)
          emit('load')
        }
      })
    }

    const renderLoading = () => {
      if (loading.value && !props.finished) {
        return (
          <div class={bem('loading')}>
            {slots.loading ? (
              slots.loading
            ) : (
              <VanLoading class={bem('loading-icon')}>{props.loadingText || '加载中'}</VanLoading>
            )}
          </div>
        )
      }
    }

    const renderFinishedText = () => {
      if (props.finished) {
        const text = slots.finished ? slots.finished() : props.finishedText
        if (text) {
          return <div class={bem('finished-text')}>{text}</div>
        }
      }
    }

    onMounted(() => {
      check()
    })

    onUpdated(() => {
      loading.value = props.loading
    })

    useEventListener('scroll', check, {
      target: scrollParent,
      passive: true
    })

    return () => {
      const Content = slots.default?.()
      const Placeholder = <div ref={placeholder} class={bem('placeholder')}></div>
      return (
        <div ref={root} class={bem()}>
          {props.direction === 'down' ? Content : Placeholder}
          {renderLoading()}
          {renderFinishedText()}
          {props.direction === 'up' ? Content : Placeholder}
        </div>
      )
    }
  }
})
