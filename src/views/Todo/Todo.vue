<template>
  <div class="todo-container">
    <ASpace direction="vertical" :size="4" class="w-full">
      <Task
        v-model:checked="newTask.isFinish"
        v-model="newTask.text"
        placeholder="Add a Task"
        @change:checked="handleAddTask"
        @keydown:enter="handleAddTask"
      />
      <TaskList :tasks="unfinishedTasks" />
      <div v-if="finishedTasks.length" class="my-2">
        <ATag color="blue">Completed</ATag>
      </div>
      <TaskList :tasks="finishedTasks" />
    </ASpace>
  </div>

  <TaskDrawer />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useTodoStore } from '@/stores'
import { transformToUTC } from '@/utils'

import TaskList from './components/TaskList.vue'
import TaskDrawer from './components/TaskDrawer.vue'

const route = useRoute()
const initNewTaskState = (): Omit<Task, 'tid' | 'important'> => ({
  isFinish: false,
  text: '',
  note: '',
  date: transformToUTC(route.params.date as string),
})

let newTask = $ref(initNewTaskState())

const todoStore = useTodoStore()
const { finishedTasks, unfinishedTasks } = $(storeToRefs(todoStore))

const handleAddTask = () => {
  todoStore.addTask(newTask)
  newTask = initNewTaskState()
}

watch(
  () => route.params.date,
  (newDate, oldDate) => {
    if (newDate !== oldDate && newDate) {
      const utcTime = transformToUTC(newDate as string)
      todoStore.getTasks({ date: utcTime })
    }
  },
  {
    immediate: true,
  },
)
</script>

<style>
.todo-container {
  @apply overflow-y-scroll h-full;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.todo-container::-webkit-scrollbar {
  display: none;
}
</style>
