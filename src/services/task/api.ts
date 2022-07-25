import { apiFactory, createService } from '@/services'

const taskService = createService('task')
const taskApi = apiFactory(taskService)

export const createTask: TaskApi.CreateTask = async (params) => {
  const resp = await taskApi<ExtractApiResponseData<TaskApi.CreateTask>>({ method: 'POST', json: params })
  return resp!
}

export const getTasks: TaskApi.GetTasks = async (params = {}) => {
  const resp = await taskApi<TaskApi.GetTasks>({ method: 'GET', searchParams: params })
  return resp!
}

export const uploadTask: TaskApi.UpdateTask = async (params) => {
  const resp = await taskApi<TaskApi.UpdateTask>({ method: 'PATCH', json: params })
  return resp!
}

export const deleteTask: TaskApi.DeleteTask = async (params) => {
  const resp = await taskApi<TaskApi.DeleteTask>({ method: 'DELETE', json: params })
  return resp!
}
