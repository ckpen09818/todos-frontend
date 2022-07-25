<template>
  <ACalendar v-model:value="selectedDate" valueFormat="YYYYMMDD" @select="onSelect" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()
const selectedDate = ref(dayjs())

let prevSelectDate: string
const onSelect = (value: string) => {
  if (prevSelectDate === value) {
    router.push(`/todo/${value}`)
  } else {
    prevSelectDate = value
  }
}
</script>
