import dayjs from 'dayjs'

export function getToday() {
  return dayjs().format('YYYYMMDD')
}

export function transformToUTC(date: string) {
  return dayjs(date, 'YYYYMMDD').toDate().toUTCString()
}
