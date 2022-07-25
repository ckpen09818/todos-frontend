import { nanoid } from 'nanoid'

const DEFAULT_SIZE = 6
export function uid(size = DEFAULT_SIZE) {
  return nanoid(size)
}
