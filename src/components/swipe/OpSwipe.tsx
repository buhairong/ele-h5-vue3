import { defineComponent, ref, reactive, computed, onMounted } from 'vue'
import { createNameSpace } from '@/utils/create'

const [name, bem] = createNameSpace('swipe')
export const SWIPE_KEY = Symbol(name)

export default defineComponent({
  name,
  props: {
    autoplay: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 500
    },
    loop: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const root = ref()
    const track = ref()
    const state = reactive({
      rect: null,
      offset: 0,
      width: 0,
      height: 0,
      active: 0,
      swiping: false
    })
    const { children, linkChildren } = useChildren(SWIPE_KEY)
    const count = computed(() => children.length)
    const size = computed(() => state[props.vertical ? 'height' : 'width'])
    const trackSize = computed(() => count.value * size.value)
    const trackStyle = computed(() => {
      const mainAxis = props.vertical ? 'height' : 'width'
      const style = {
        transitionDuration: `${state.swiping ? 0 : props.duration}`,
        transform: `translate${props.vertical ? 'Y' : 'X'}(${state.offset})`,
        [mainAxis]: `${trackSize.value}px`
      }

      return style
    })

    const init = () => {
      if (!root.value) {
        return
      }

      const rect = {
        width: root.value?.offsetWidth,
        height: root.value?.offsetHeight
      }
    }

    onMounted(init)

    return () => (
      <div ref={root} class={bem()}>
        <div ref={track} style={trackStyle.value} class={bem('track')}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})
