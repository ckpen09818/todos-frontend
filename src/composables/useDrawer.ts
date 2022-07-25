import { ref, shallowRef, type Ref } from 'vue'

const visible = shallowRef(false)
let data: any

export function useDrawer<DataState>() {
  data = ref<DataState>()

  const showDrawer = (payload?: DataState) => {
    visible.value = true
    data.value = payload
  }
  const closeDrawer = (cb?: Function) => {
    visible.value = false
    cb?.()
  }

  return {
    visible,
    data: data as Ref<DataState>,
    closeDrawer,
    showDrawer,
  }
}
