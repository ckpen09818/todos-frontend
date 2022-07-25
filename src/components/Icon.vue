<script lang="ts">
import { h, defineComponent, PropType, useCssModule, useAttrs } from 'vue'

const iconColorMap = {
  primary: '#077fd9',
  black: '#000',
  white: '#fff',
}
type DefaultIconColor = keyof typeof iconColorMap
type IconColor = DefaultIconColor | Color

export default defineComponent({
  name: 'Icon',
  inheritAttrs: false,
  props: {
    icon: Function,
    color: {
      type: String as PropType<IconColor>,
      default: 'primary' as 'primary',
    },
  },
  setup(props, context) {
    const styles = useCssModule()
    const attrs = useAttrs()

    return () => {
      const style = {
        '--icon-color': props.color in iconColorMap ? iconColorMap[props.color as DefaultIconColor] : props.color,
      }
      const iconAttrs = {
        style,
        class: styles['icon'],
      }

      return h('div', iconAttrs, props.icon!(attrs, context))
    }
  },
})
</script>

<style module>
.icon {
  @apply cursor-pointer inline-flex;
  color: var(--icon-color);
}
</style>
