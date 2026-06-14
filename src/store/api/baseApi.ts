import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { clearCredentials } from '../authSlice'

type AuthSliceState = {
  auth: {
    username: string | null
    password: string | null
  }
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://10.201.234.135:8889/lucky-cup/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const { username, password } = (getState() as AuthSliceState).auth
    if (username && password) {
      headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`)
    }
    return headers
  },
})

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    api.dispatch(clearCredentials())
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Reward', 'Winner', 'Participant'],
  endpoints: () => ({}),
})
