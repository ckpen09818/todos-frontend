declare namespace TaskApi {
  type CreateTask = Api<
    {
      text: string
      note?: string
      isFinish: boolean
      date: Date | string
    },
    Task
  >

  type GetTasks = Api<{ isFinish?: boolean; important?: boolean; date?: string }, Task[]>
  type UpdateTask = Api<
    {
      tid: string
      isFinish?: boolean
      important?: boolean
      text?: string
      note?: string
    },
    Task
  >
  type DeleteTask = Api<{ tid: string }>
}
