<template>
  <Checkbox v-model="task.important" @change="todoStore.updateTask(task)">
    <template #trueIcon>
      <Icon :icon="StarFilled" />
    </template>
    <template #falseIcon>
      <Icon :icon="StarOutlined" />
    </template>
  </Checkbox>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores'

import { StarOutlined, StarFilled } from '@ant-design/icons-vue'

type Props = { task: Task }
defineProps<Props>()

const todoStore = useTodoStore()
</script>
