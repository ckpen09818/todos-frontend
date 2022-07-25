import { defineStore, acceptHMRUpdate } from 'pinia'

import * as taskService from '@/services/task'

interface State {
  tasks: Task[]
}

export const useTodoStore = defineStore('todo', {
  state: (): State => ({
    tasks: [],
  }),
  getters: {
    finishedTasks: (state) => state.tasks.filter((task) => task.isFinish),
    unfinishedTasks: (state) => state.tasks.filter((task) => !task.isFinish),
  },
  actions: {
    async getTasks(query: ExtractApiParams<TaskApi.GetTasks> = {}) {
      const { data } = await taskService.getTasks(query)
      this.tasks = data
    },
    async addTask(params: ExtractApiParams<TaskApi.CreateTask>) {
      if (!params.text) return

      const { data } = await taskService.createTask(params)
      this.tasks.push(data)
    },
    async updateTask(params: ExtractApiParams<TaskApi.UpdateTask>) {
      const { tid } = params
      const { data } = await taskService.uploadTask(params)
      this.updateTasks({ tid, data }, 'update')
    },
    async deleteTask(tid: string) {
      const { success } = await taskService.deleteTask({ tid })
      if (success) {
        this.updateTasks({ tid }, 'delete')
      }
    },
    updateTasks(target: { tid: string; data?: Task }, op: 'update' | 'delete') {
      const { tid, data } = target
      const idx = this.tasks.findIndex((task) => task.tid === tid)
      if (op === 'update') {
        this.tasks[idx] = data!
      }
      if (op === 'delete') {
        this.tasks.splice(idx, 1)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
}
