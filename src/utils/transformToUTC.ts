import dayjs from 'dayjs'

export function transformToUTC(date: string) {
  return dayjs(date, 'YYYYMMDD').toDate().toUTCString()
}
