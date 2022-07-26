import { getToday } from '@/utils'
import { RouteRecordRaw } from 'vue-router'

const Todo = () => import('@/views/Todo')
const Calendar = () => import('@/views/Calendar')

export const routes: RouteRecordRaw[] = [
  {
    path: '/todo/:date',
    name: 'Todo',
    component: Todo,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: `/todo/${getToday()}`,
  },
]
