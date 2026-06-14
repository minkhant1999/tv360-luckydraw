import type { History, LoginResponse, Participant, Reward, Winner, WinnerType } from '../../types'
import { baseApi } from './baseApi'

export const luckyDrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLogin: builder.query<LoginResponse, void>({
      query: () => '/auth/login',
    }),
    getRewards: builder.query<Reward[], void>({
      query: () => '/rewards',
      providesTags: ['Reward'],
    }),
    getWinners: builder.query<Winner[], void>({
      query: () => '/winners',
      providesTags: ['Winner'],
    }),
    getParticipants: builder.query<Participant[], void>({
      query: () => '/participants',
      providesTags: ['Participant'],
    }),
    getHisotry: builder.query<History[], { type: WinnerType }>({
      query: ({ type }) => `/history/${type}`,
      providesTags: ['Participant'],
    }),
  }),
})

export const {
  useLazyGetLoginQuery,
  useGetRewardsQuery,
  useGetWinnersQuery,
  useGetParticipantsQuery,
  useGetHisotryQuery,
} = luckyDrawApi
