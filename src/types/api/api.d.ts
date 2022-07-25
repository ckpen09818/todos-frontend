type ApiBaseResponse = {
  code: number
  message: string
  success: boolean
}

type ApiResponse<T = null> = T extends null ? ApiBaseResponse : ApiBaseResponse & { data: T }

type Api<Params = any, Response = null, R = ApiResponse<Response>> = (params: Params) => Promise<R>
type ExtractApiParams<T extends Api> = Parameters<T>[number]
type ExtractApiResponseData<T extends Api> = Awaited<ReturnType<T>>['data']
type ExtractPartialApiParams<T extends Api> = Partial<ExtractApiParams<T>>
