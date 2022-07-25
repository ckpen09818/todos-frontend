<template>
  <div class="task-list">
    <Task
      v-for="task in tasks"
      :key="task.tid"
      v-model:checked="task.isFinish"
      v-model="task.text"
      @change:checked="todoStore.updateTask(task)"
      @keydown:enter="todoStore.updateTask(task)"
    >
      <template #suffix>
        <TaskMarkedAction :task="task" />
        <Icon :icon="DeleteOutlined" @click="todoStore.deleteTask(task.tid)" />
        <Icon :icon="EditOutlined" @click="showDrawer(task)" />
      </template>
    </Task>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores'
import { useDrawer } from '@/composables'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import TaskMarkedAction from './TaskMarkedAction.vue'

defineProps({
  tasks: Array<Task>,
})

const { showDrawer } = useDrawer<Task>()
const todoStore = useTodoStore()
</script>

<style>
.task-list {
  @apply w-full flex flex-col gap-2;
}
</style>
