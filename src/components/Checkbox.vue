<template>
  <div :class="$style['checkbox']">
    <input
      ref="inputRef"
      type="checkbox"
      :id="checkboxId"
      :class="[($slots.trueIcon || $slots.falseIcon) && 'hidden']"
      :checked="internalChecked"
      :data-indeterminate="indeterminate ? 'yes' : undefined"
      v-bind="{ disabled, trueValue, falseValue, value }"
      @change="onChange"
    />
    <label :for="checkboxId" :class="$style['checkbox__wrapper']">
      <slot v-if="internalChecked" name="trueIcon" />
      <slot v-else name="falseIcon" />

      <span v-if="$props.label">{{ label }}</span>
      <slot v-else />
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useCssModule, watch } from 'vue'
import { looseIndexOf } from '@vue/shared'
import { isArray, uid } from '@/utils'

export default defineComponent({
  inheritAttrs: false,
  props: {
    id: {
      required: false,
      type: String,
    },
    modelValue: {
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    value: {
      required: false,
    },
    indeterminate: Boolean,
    disabled: Boolean,
    trueValue: String,
    falseValue: String,
    checked: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    const checkboxId = props.id || uid()
    const inputRef = ref<HTMLInputElement>()
    const style = useCssModule()

    function onChange(e: Event) {
      const checked = (e.target as HTMLInputElement).checked

      if (isArray(props.modelValue)) {
        const modelValue = props.modelValue
        const elementValue = props.value as any
        const index = looseIndexOf(modelValue, elementValue)
        const found = index !== -1

        let newModelValue: any[] = []
        if (checked && !found) {
          newModelValue = modelValue.concat(elementValue)
        } else if (!checked && found) {
          newModelValue = [...modelValue]
          newModelValue.splice(index, 1)
        }
        ctx.emit('update:modelValue', newModelValue)
        ctx.emit('change', newModelValue)
      } else {
        const hasCustomTrueFalseValue = props.trueValue && props.falseValue
        const checkedValue = hasCustomTrueFalseValue ? (checked ? props.trueValue : props.falseValue) : checked
        ctx.emit('update:modelValue', checkedValue)
        ctx.emit('change', checkedValue)
      }
    }

    const internalChecked = computed(() => {
      if (isArray(props.modelValue)) return looseIndexOf(props.modelValue, props.value) > -1
      if (typeof props.modelValue === 'boolean') {
        return props.modelValue || props.checked || false
      }
      if (props.trueValue && props.falseValue) {
        return props.modelValue === props.trueValue
      }
      return props.checked
    })

    if (!isArray(props.modelValue)) {
      watch(
        () => props.indeterminate,
        (val) => {
          inputRef.value!.indeterminate = val
        },
      )

      onMounted(() => {
        inputRef.value!.indeterminate = props.indeterminate
      })
    }

    return {
      checkboxId,
      inputRef,
      internalChecked,
      onChange,
      style,
    }
  },
})
</script>

<style scoped module>
.checkbox {
  @apply inline-block relative cursor-pointer;
}
.checkbox__wrapper {
  @apply flex justify-start items-center gap-2 cursor-pointer;
}
</style>
