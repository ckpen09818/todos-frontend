<template>
  <ACard
    ref="taskRef"
    tabindex="0"
    :class="['task', !bordered && '!border-none']"
    :bodyStyle="{ padding: '0.5rem' }"
    @keydown.enter.stop="inputFocus = true"
  >
    <div class="task__wrapper">
      <ACheckbox name="taskCheckbox" v-model:checked="internalChecked" />
      <slot name="prefix" />
      <AInput
        ref="inputRef"
        class="task__input"
        v-bind="{
          bordered: inputFocus,
          ...inputProps,
          ...$attrs,
        }"
        v-model:value="internalInputValue"
        @keydown.enter.stop="handlePressEnterKey"
      />
      <slot name="suffix" />
    </div>
  </ACard>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFocus } from '@vueuse/core'

const props = defineProps({
  checked: Boolean,
  disabled: Boolean,
  modelValue: { type: String },
  bordered: Boolean,
})

const emit = defineEmits<{
  (e: 'focus'): void
  (e: 'change', val?: string): void
  (e: 'input', val?: string): void
  (e: 'update:modelValue', val?: string): void
  (e: 'change:checked', val: boolean): void
  (e: 'update:checked', val: boolean): void
  (e: 'keydown:enter'): void
}>()

const taskRef = ref<HTMLDivElement>()
const inputRef = ref(null)

let { focused: inputFocus } = useFocus(inputRef)
let { focused: taskFocus } = useFocus(taskRef)
watch([inputFocus, taskFocus], () => {
  emit('focus')
})

const internalChecked = computed({
  get() {
    return props.checked
  },
  set(val) {
    if (!props.modelValue) return

    emit('update:checked', val)
    emit('change:checked', val)
  },
})

const internalInputValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
    emit('input', val)
    emit('change', val)
  },
})

const inputProps = computed(() => (props.checked ? { class: ['task__input--done'] } : {}))

const handlePressEnterKey = () => {
  inputFocus.value = false
  taskFocus.value = true
  emit('keydown:enter')
}
</script>

<style scoped>
.task {
  @apply relative rounded-lg w-full;
}

.task__wrapper {
  @apply flex justify-start items-center gap-1;
}
.task__input {
  @apply h-8;
}
.task__input:not(:focus) {
  @apply cursor-default;
}
.task__input--done {
  @apply line-through text-gray-400;
}
</style>
