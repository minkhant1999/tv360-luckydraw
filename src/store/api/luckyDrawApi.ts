import type {
  History,
  LoginRequest,
  LoginResponse,
  Participant,
  Reward,
  Winner,
  WinnerType,
} from '../../types'
import { baseApi } from './baseApi'

export const luckyDrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
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
      query: ({ type }) => `/history?type=${type}`,
      providesTags: ['Participant'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetRewardsQuery,
  useGetWinnersQuery,
  useGetParticipantsQuery,
  useGetHisotryQuery,
} = luckyDrawApi
