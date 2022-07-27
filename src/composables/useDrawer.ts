import { isRef, ref, shallowRef, unref, type Ref } from 'vue'

const visible = shallowRef(false)
let state: any

export function useDrawer<DataState>() {
  state = state ?? isRef(state) ? state : ref()

  const showDrawer = (payload: DataState | null = null, cb?: Function) => {
    visible.value = true
    if (payload) {
      state.value = isRef(payload) ? unref(payload) : payload
    }
    cb?.()
  }
  const closeDrawer = (cb?: Function) => {
    visible.value = false
    cb?.()
  }

  return {
    visible,
    state: state as Ref<DataState>,
    closeDrawer,
    showDrawer,
  }
}
