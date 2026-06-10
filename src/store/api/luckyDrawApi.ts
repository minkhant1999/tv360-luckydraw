import type { Participant, Reward, Winner } from '../../types'
import { baseApi } from './baseApi'

export const luckyDrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
})

export const {
  useGetRewardsQuery,
  useGetWinnersQuery,
  useGetParticipantsQuery,
} = luckyDrawApi
