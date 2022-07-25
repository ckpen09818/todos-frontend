const Todo = () => import('@/views/Todo')
const Calendar = () => import('@/views/Calendar')

export const routes = [
  {
    path: '/todo/:date',
    component: Todo,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
]
