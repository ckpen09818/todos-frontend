<template>
  <ADrawer :closable="false" :bodyStyle="{ padding: '12px' }" v-model:visible="visible">
    <div class="flex flex-col h-full">
      <template v-if="task">
        <Task
          :bordered="false"
          v-model:checked="task.isFinish"
          v-model="task.text"
          @change:checked="todoStore.updateTask(task)"
          @keydown:enter="todoStore.updateTask(task)"
        >
          <template #suffix>
            <TaskMarkedAction :task="task" />
          </template>
        </Task>
        <div class="drawer__content">
          <ATextarea
            placeholder="Add Note"
            :autoSize="{ minRows: 10, maxRows: 20 }"
            v-model:value="task.note"
            @change="debouncedUpdateTask"
          />
        </div>
      </template>
      <div class="drawer__footer">
        <Icon :icon="RightOutlined" @click="closeDrawer(() => todoStore.updateTask(task))" />
        <Icon :icon="DeleteOutlined" @click="closeDrawer(() => todoStore.deleteTask(task.tid))" />
      </div>
    </div>
  </ADrawer>
</template>

<script setup lang="ts">
import { unref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import { useTodoStore } from '@/stores'
import { useDrawer } from '@/composables'

import { RightOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import TaskMarkedAction from './TaskMarkedAction.vue'

const todoStore = useTodoStore()
const { visible, data: task, closeDrawer } = useDrawer<Task>()

const debouncedUpdateTask = useDebounceFn(
  () => {
    todoStore.updateTask(unref(task))
  },
  1000,
  { maxWait: 5000 },
)
</script>

<style scoped>
.drawer__content {
  @apply p-2;
}
.drawer__footer {
  @apply flex justify-between items-center mt-auto;
}
</style>
