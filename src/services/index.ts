export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const API_PATH = 'api/v1'

import ky, { type Options } from 'ky'
import { KyInstance } from 'ky/distribution/types/ky'

class HttpError extends Error {}

const apiURL = `${API_BASE_URL}/${API_PATH}`
export function createService(url: string, options: Options = {}) {
  return ky.create({ prefixUrl: `${apiURL}/${url}`, ...options })
}

export const apiFactory =
  (service: KyInstance) =>
  async <T>(options: Options & { url?: string } = {}) => {
    const { url = '', ...requestOptions } = options
    try {
      const resp = await service(url, { ...requestOptions })
      if (!resp.ok) {
        throw new HttpError(`Fetch error: ${resp.statusText}`)
      }

      const data = await resp.json<ApiResponse<T extends Api ? ExtractApiResponseData<T> : T>>()
      return data
    } catch (error) {
      console.log('error', error)
    }
  }
